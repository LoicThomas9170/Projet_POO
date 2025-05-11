export interface Ingredient {
  id: string;
  name: string;
  category: 'base' | 'filling' | 'topping' | 'supplement';
  price: number;
  image?: string;
}

export interface BreadRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  price: number;
  image?: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
}