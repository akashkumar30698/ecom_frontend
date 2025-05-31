
export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
};

export type FilterOptions = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  sortBy?: 'price-low-to-high' | 'price-high-to-low' | 'newest';
};
