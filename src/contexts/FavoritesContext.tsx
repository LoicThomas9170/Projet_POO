import React, { createContext, useState, useContext, useEffect } from 'react';
import { BreadRecipe } from '../types';

interface FavoritesContextType {
  favorites: BreadRecipe[];
  addToFavorites: (recipe: BreadRecipe) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<BreadRecipe[]>(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem('bakeryFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakeryFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe: BreadRecipe) => {
    if (!isFavorite(recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(recipe => recipe.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};