import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingCart, Heart, Share2, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Ingredient, BreadRecipe } from '../types';
import { ingredients, getIngredientsByCategory } from '../data/ingredients';
import creationImage from '../images/creation.png';

const Configurator: React.FC = () => {
  const { addToCart } = useCart();
  const { addToFavorites, isFavorite } = useFavorites();
  
  const [recipeName, setRecipeName] = useState('Ma création');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [currentTab, setCurrentTab] = useState<Ingredient['category']>('base');
  const [isPublic, setIsPublic] = useState(false);
  const [recipeCreated, setRecipeCreated] = useState<BreadRecipe | null>(null);
  
  // Calculate total price
  const totalPrice = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  
  // Check if a base is selected
  const hasBase = selectedIngredients.some(ingredient => ingredient.category === 'base');
  
  // Get ingredients for current tab
  const currentTabIngredients = getIngredientsByCategory(currentTab);
  
  // Check if an ingredient is selected
  const isIngredientSelected = (ingredient: Ingredient) => {
    return selectedIngredients.some(item => item.id === ingredient.id);
  };
  
  // Toggle ingredient selection
  const toggleIngredient = (ingredient: Ingredient) => {
    if (ingredient.category === 'base') {
      // Remove any previously selected base
      const filteredIngredients = selectedIngredients.filter(item => item.category !== 'base');
      setSelectedIngredients([...filteredIngredients, ingredient]);
    } else {
      if (isIngredientSelected(ingredient)) {
        setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredient.id));
      } else {
        setSelectedIngredients([...selectedIngredients, ingredient]);
      }
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setRecipeName('Ma création');
    setRecipeDescription('');
    setSelectedIngredients([]);
    setIsPublic(false);
    setRecipeCreated(null);
  };
  
  // Create recipe
  const createRecipe = () => {
    if (!hasBase) {
      alert('Veuillez sélectionner une base pour votre création.');
      return;
    }
    
    const newRecipe: BreadRecipe = {
      id: uuidv4(),
      name: recipeName,
      description: recipeDescription,
      ingredients: selectedIngredients,
      price: totalPrice,
      image: selectedIngredients.find(i => i.category === 'base')?.image,
      isPublic,
      createdBy: 'Utilisateur',
      createdAt: new Date()
    };
    
    setRecipeCreated(newRecipe);
  };
  
  // Add to cart
  const handleAddToCart = () => {
    if (recipeCreated) {
      addToCart(recipeCreated);
      alert('Votre création a été ajoutée au panier!');
    }
  };
  
  // Add to favorites
  const handleAddToFavorites = () => {
    if (recipeCreated) {
      addToFavorites(recipeCreated);
      alert('Votre création a été ajoutée aux favoris!');
    }
  };
  
  // Share recipe
  const handleShareRecipe = () => {
    if (recipeCreated) {
      setIsPublic(true);
      alert('Votre création a été partagée dans la vitrine publique!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">Configurateur de Pain</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Ingredient Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex overflow-x-auto pb-2 mb-4">
              <button
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${currentTab === 'base' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
                onClick={() => setCurrentTab('base')}
              >
                Base
              </button>
              <button
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${currentTab === 'filling' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
                onClick={() => setCurrentTab('filling')}
              >
                Garniture
              </button>
              <button
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${currentTab === 'topping' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
                onClick={() => setCurrentTab('topping')}
              >
                Toppings
              </button>
              <button
                className={`px-4 py-2 rounded-md whitespace-nowrap ${currentTab === 'supplement' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'}`}
                onClick={() => setCurrentTab('supplement')}
              >
                Suppléments
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {currentTabIngredients.map(ingredient => (
                <div
                  key={ingredient.id}
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                    isIngredientSelected(ingredient) 
                      ? 'border-amber-600 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  <div className="flex items-center">
                    {ingredient.image && (
                      <img 
                        src={ingredient.image} 
                        alt={ingredient.name} 
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-amber-800">{ingredient.name}</h3>
                      <p className="text-amber-600 font-medium">{ingredient.price.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Personnalisation</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nom de votre création</label>
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Donnez un nom à votre création"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Décrivez votre création"
                rows={3}
              />
            </div>
            
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isPublic" className="text-gray-700">
                Partager ma création dans la vitrine publique
              </label>
            </div>
            
            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Réinitialiser
              </button>
              <button
                onClick={createRecipe}
                disabled={!hasBase}
                className={`px-4 py-2 rounded-md ${
                  hasBase 
                    ? 'bg-amber-600 text-white hover:bg-amber-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Créer ma recette
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Recipe Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">
              {recipeCreated ? 'Votre création' : 'Aperçu'}
            </h2>
            
            {hasBase ? (
              <>
                <div className="mb-4">
  <img
    src={
      // Si la combinaison spéciale est détectée, on montre l'image custom
      selectedIngredients.find(i => i.name === 'Brioche') &&
      selectedIngredients.find(i => i.name === 'Crème chocolat') &&
      selectedIngredients.find(i => i.name === 'Pistache') &&
      selectedIngredients.find(i => i.name === 'Noisette') &&
      selectedIngredients.find(i => i.name === 'Banane')
        ? creationImage
        : null
    }
    alt="Aperçu"
    className="w-full h-48 object-cover rounded-lg"
  />
</div>
                
                <h3 className="font-semibold text-amber-800 text-lg mb-2">{recipeName}</h3>
                
                {recipeDescription && (
                  <p className="text-gray-700 mb-4">{recipeDescription}</p>
                )}
                
                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <h4 className="font-medium text-amber-800 mb-2">Ingrédients sélectionnés:</h4>
                  <ul className="pl-5 list-disc">
                    {selectedIngredients.map(ingredient => (
                      <li key={ingredient.id} className="text-gray-700">
                        {ingredient.name} - {ingredient.price.toFixed(2)} €
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-700">Prix total:</span>
                  <span className="text-xl font-bold text-amber-800">{totalPrice.toFixed(2)} €</span>
                </div>
                
                {recipeCreated ? (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 flex items-center justify-center"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Ajouter au panier
                    </button>
                    
                    <button
                      onClick={handleAddToFavorites}
                      className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${
                        recipeCreated && isFavorite(recipeCreated.id)
                          ? 'bg-pink-100 text-pink-600 border border-pink-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`mr-2 h-5 w-5 ${
                        recipeCreated && isFavorite(recipeCreated.id) ? 'fill-pink-600' : ''
                      }`} />
                      {recipeCreated && isFavorite(recipeCreated.id) 
                        ? 'Ajouté aux favoris' 
                        : 'Ajouter aux favoris'}
                    </button>
                    
                    {!isPublic && (
                      <button
                        onClick={handleShareRecipe}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Share2 className="mr-2 h-5 w-5" />
                        Partager dans la vitrine
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-amber-600 text-center">
                    Cliquez sur "Créer ma recette" pour finaliser
                  </p>
                )}
              </>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500 mb-4">
                  Sélectionnez une base pour commencer votre création
                </p>
                <button
                  onClick={() => setCurrentTab('base')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Choisir une base
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;