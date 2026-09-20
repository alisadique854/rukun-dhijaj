export interface Product {
  id?: string;

  name: string;
  name_ar?: string;

  description: string;
  description_ar?: string;

  image: string;

  // Multiple product images (optional)
  gallery?: string[];

  // Ingredients
  ingredients?: string[];
  ingredients_ar?: string[];

  price: number;

  active: boolean;

  order: number;

  categoryId?: string;
}