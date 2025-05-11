import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { BreadRecipe } from '../types';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface RecipeCardProps {
  recipe: BreadRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const toggleFavorite = () => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(recipe);
    alert('Le produit a été ajouté au panier!');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={recipe.image || 'https://images.pexels.com/photos/1082343/pexels-photo-1082343.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={recipe.name} 
          className="w-full h-56 object-cover"
        />
        <button
          onClick={toggleFavorite}
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
          <ul className="text-gray-600 text-sm">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index} className="inline-block mr-2">
                {ingredient.name}{index < Math.min(2, recipe.ingredients.length - 1) ? ', ' : ''}
              </li>
            ))}
            {recipe.ingredients.length > 3 && <li className="inline-block">...</li>}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-800">{recipe.price.toFixed(2)} €</span>
          <button
            onClick={handleAddToCart}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;