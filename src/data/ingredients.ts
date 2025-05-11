import { Ingredient } from '../types';
import { v4 as uuidv4 } from 'uuid';
import bananeImage from '../images/banane.png';
import fraiseImage from '../images/fraise.png';
import framboiseImage from '../images/framboise.png';
import mangueImage from '../images/mangue.png';
import caramelImage from '../images/caramel.png';
import pistacheImage from '../images/pistache.png';
import noisetteImage from '../images/noisette.png';
import perleImage from '../images/perle de sucre.png';
import pralineImage from '../images/praline.png';
import chocolatImage from '../images/chocolat.png';
import vanilleImage from '../images/vanille.png';
import citronImage from '../images/citron.png';
import feuilleteImage from '../images/feuillete.png';
import sableImage from '../images/sable.png';
import genoiseImage from '../images/genoise.png';
import briocheImage from '../images/brioche.png';

export const ingredients: Ingredient[] = [
  // Bases
  {
    id: uuidv4(),
    name: 'Génoise',
    category: 'base',
    price: 2.50,
    image: genoiseImage,
  },
  {
    id: uuidv4(),
    name: 'Brioche',
    category: 'base',
    price: 3.00,
    image: briocheImage,
  },
  {
    id: uuidv4(),
    name: 'Sablé',
    category: 'base',
    price: 3.50,
    image: sableImage,
  },
  {
    id: uuidv4(),
    name: 'Feuilleté',
    category: 'base',
    price: 1.80,
    image: feuilleteImage,
  },
  
  // Fillings
  {
    id: uuidv4(),
    name: 'Crème vanille',
    category: 'filling',
    price: 1.50,
    image: vanilleImage,
  },
  {
    id: uuidv4(),
    name: 'Crème chocolat',
    category: 'filling',
    price: 1.20,
    image: chocolatImage,
  },
  {
    id: uuidv4(),
    name: 'Crème citron',
    category: 'filling',
    price: 1.80,
    image: citronImage,
  },
  {
    id: uuidv4(),
    name: 'Crème pralinée',
    category: 'filling',
    price: 0.80,
    image: pralineImage,
  },
  
  // Toppings
  {
    id: uuidv4(),
    name: 'Perle de sucre',
    category: 'topping',
    price: 0.50,
    image: perleImage,
  },
  {
    id: uuidv4(),
    name: 'Noisette',
    category: 'topping',
    price: 0.50,
    image: noisetteImage,
  },
  {
    id: uuidv4(),
    name: 'Pistache',
    category: 'topping',
    price: 0.70,
    image: pistacheImage,
  },
  {
    id: uuidv4(),
    name: 'Caramel',
    category: 'topping',
    price: 0.40,
    image: caramelImage,
  },
  
  // Supplements
  {
    id: uuidv4(),
    name: 'Banane',
    category: 'supplement',
    price: 0.90,
    image: bananeImage,
  },
  {
    id: uuidv4(),
    name: 'Fraise',
    category: 'supplement',
    price: 1.10,
    image: fraiseImage,
  },
  {
    id: uuidv4(),
    name: 'Framboise',
    category: 'supplement',
    price: 1.30,
    image: framboiseImage,
  },
  {
    id: uuidv4(),
    name: 'Mangue',
    category: 'supplement',
    price: 0.80,
    image: mangueImage,
  }
];

export const getIngredientsByCategory = (category: Ingredient['category']) => {
  return ingredients.filter(ingredient => ingredient.category === category);
};