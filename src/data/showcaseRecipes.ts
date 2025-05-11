import { BreadRecipe } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ingredients } from './ingredients';
import evanImage from '../images/evan.png';
import echocImage from '../images/echoc.png';
import cpommeImage from '../images/cpomme.png';
import paczekImage from '../images/paczek.png';

// Helper function to find ingredients by name
const findIngredientByName = (name: string) => {
  return ingredients.find(ingredient => ingredient.name === name);
};

export const showcaseRecipes: BreadRecipe[] = [
  {
    id: uuidv4(),
    name: 'Croissant au Chocolat',
    description: 'Notre délicieux croissant garni de chocolat noir fondu et saupoudré de sucre glace.',
    ingredients: [
      findIngredientByName('Pain Blanc')!,
      findIngredientByName('Chocolat')!,
      findIngredientByName('Sucre Glace')!
    ],
    price: 5.50,
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=600',
    isPublic: true,
    createdBy: 'Boulangerie',
    createdAt: new Date('2023-01-15')
  },
  {
    id: uuidv4(),
    name: 'Éclair à la Vanille',
    description: 'Éclair garni de crème pâtissière à la vanille et nappé de glaçage.',
    ingredients: [
      findIngredientByName('Pain Blanc')!,
      findIngredientByName('Crème Pâtissière')!,
      findIngredientByName('Glaçage')!
    ],
    price: 7.20,
    image: evanImage,
    isPublic: true,
    createdBy: 'Boulangerie',
    createdAt: new Date('2023-02-20')
  },
  {
    id: uuidv4(),
    name: 'Millefeuille aux Fruits',
    description: 'Millefeuille garni de crème pâtissière et fruits rouges frais.',
    ingredients: [
      findIngredientByName('Pain Blanc')!,
      findIngredientByName('Crème Pâtissière')!,
      findIngredientByName('Fruits Rouges')!,
      findIngredientByName('Sucre Glace')!
    ],
    price: 6.50,
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600',
    isPublic: true,
    createdBy: 'Boulangerie',
    createdAt: new Date('2023-03-10')
  },
  {
    id: uuidv4(),
    name: 'Chausson aux Pommes',
    description: 'Chausson garni de pommes caramélisées et saupoudré de sucre glace.',
    ingredients: [
      findIngredientByName('Pain Blanc')!,
      findIngredientByName('Pommes Caramélisées')!,
      findIngredientByName('Sucre Glace')!
    ],
    price: 5.80,
    image: cpommeImage,
    isPublic: true,
    createdBy: 'Boulangerie',
    createdAt: new Date('2023-04-05')
  },
  {
    id: uuidv4(),
    name: 'Donut',
    description: 'Donut',
    ingredients: [
      findIngredientByName('Pain Blanc')!,
      findIngredientByName('Crème au Beurre')!,
      findIngredientByName('Amandes Effilées')!
    ],
    price: 6.20,
    image: paczekImage,
    isPublic: true,
    createdBy: 'Boulangerie',
    createdAt: new Date('2023-05-12')
  },
  {
    id: uuidv4(),
    name: 'Éclair au Chocolat',
    description: 'Éclair garni de crème au chocolat et décoré de pépites de chocolat.',
    ingredients: [
      findIngredientByName('Pain Blanc')!,
      findIngredientByName('Chocolat')!,
      findIngredientByName('Pépites de Chocolat')!,
      findIngredientByName('Glaçage')!
    ],
    price: 8.50,
    image: echocImage,
    isPublic: true,
    createdBy: 'Boulangerie',
    createdAt: new Date('2023-06-20')
  }
];