import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Coffee, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { BreadRecipe } from '../types';
import { showcaseRecipes } from '../data/showcaseRecipes';
import creationImage from '../images/creation.png';

const Showcase: React.FC = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const [recipes, setRecipes] = useState<BreadRecipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all');
  
  // Load recipes from localStorage (user shared recipes) and combine with showcase recipes
  useEffect(() => {
    const savedFavorites = localStorage.getItem('bakeryFavorites');
    const userFavorites = savedFavorites 
      ? JSON.parse(savedFavorites).filter((recipe: BreadRecipe) => recipe.isPublic) 
      : [];
    
    const allRecipes = [...showcaseRecipes, ...userFavorites];
    setRecipes(allRecipes);
  }, []);
  
  // Filter recipes based on search term and filter tab
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterTab === 'all') return matchesSearch;
    if (filterTab === 'bakery') return matchesSearch && recipe.createdBy === 'Boulangerie';
    if (filterTab === 'community') return matchesSearch && recipe.createdBy !== 'Boulangerie';
    
    return matchesSearch;
  });
  
  // Toggle favorite status
  const toggleFavorite = (recipe: BreadRecipe) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };
  
  // Add to cart
  const handleAddToCart = (recipe: BreadRecipe) => {
    addToCart(recipe);
    alert('Le produit a été ajouté au panier!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">Vitrine de Recettes</h1>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Découvrez nos créations et celles partagées par notre communauté. Vous pouvez commander directement ou vous inspirer pour votre propre création.
        </p>
        
        <div className="w-full max-w-md mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une recette..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${filterTab === 'all' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
            onClick={() => setFilterTab('all')}
          >
            Toutes les recettes
          </button>
          <button
            className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${filterTab === 'bakery' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
            onClick={() => setFilterTab('bakery')}
          >
            Recettes de la boulangerie
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${filterTab === 'community' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
            onClick={() => setFilterTab('community')}
          >
            Recettes de la communauté
          </button>
        </div>
      </div>
      
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
              <img 
  src={recipe.createdBy !== 'Boulangerie' ? creationImage : recipe.image || creationImage} 
  alt={recipe.name} 
  className="w-full h-56 object-cover" 
/>
                <button
                  onClick={() => toggleFavorite(recipe)}
                  className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100 transition-all duration-200"
                >
                  <Heart className={`h-5 w-5 ${isFavorite(recipe.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} />
                </button>
                {recipe.createdBy !== 'Boulangerie' && (
                  <div className="absolute top-2 left-2 bg-amber-100 text-amber-800 px-2 py-1 text-xs font-medium rounded">
                    Recette communautaire
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-amber-800 mb-2">{recipe.name}</h2>
                <p className="text-gray-700 mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium text-amber-700 mb-1">Ingrédients:</h3>
                  {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
  <ul className="text-gray-600 text-sm">
    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
      <li key={index} className="inline-block mr-2">
        {ingredient?.name ?? 'Ingrédient inconnu'}{index < Math.min(2, recipe.ingredients.length - 1) ? ', ' : ''}
      </li>
    ))}
    {recipe.ingredients.length > 3 && <li className="inline-block">...</li>}
  </ul>
) : (
  <p className="text-gray-500 italic text-sm">Aucun ingrédient renseigné</p>
)}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-800">{recipe.price.toFixed(2)} €</span>
                  <button
                    onClick={() => handleAddToCart(recipe)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-amber-50 rounded-lg p-8 text-center">
          <Coffee className="mx-auto h-12 w-12 text-amber-600 mb-3" />
          <h2 className="text-xl font-semibold text-amber-800 mb-2">Aucune recette trouvée</h2>
          <p className="text-gray-700 mb-4">
            Aucune recette ne correspond à votre recherche. Essayez d'autres termes ou créez votre propre recette.
          </p>
          <Link
            to="/configurator"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
          >
            Créer ma propre recette
          </Link>
        </div>
      )}
      
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Vous avez une idée en tête ?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Utilisez notre configurateur pour créer votre propre recette personnalisée. Vous pourrez ensuite l'ajouter à vos favoris ou la partager dans la vitrine.
        </p>
        <Link
          to="/configurator"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
        >
          Créer ma recette
        </Link>
      </div>
    </div>
  );
};

export default Showcase;