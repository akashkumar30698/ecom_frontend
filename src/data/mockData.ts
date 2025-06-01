
import { Product, Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "graphic",
    name: "Graphic Tees",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "plain",
    name: "Plain Essentials",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "vintage",
    name: "Vintage Collection",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "limited",
    name: "Limited Edition",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80"
  }
];

export const PRODUCTS: Product[] = [
  {
    _id: "p1",
    name: "Classic White Tee",
    description: "A timeless plain white t-shirt made from 100% organic cotton.",
    price: 24.99,
    category: "plain",
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    inStock: true
  },
  {
    _id: "p2",
    name: "Urban Graphic Tee",
    description: "Bold urban-inspired graphic design on a premium cotton blend.",
    price: 34.99,
    discount: 10,
    category: "graphic",
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["black", "white", "navy"],
    inStock: true
  },
  {
    _id: "p3",
    name: "Vintage Wash Tee",
    description: "Soft pre-washed cotton with that perfect lived-in feel.",
    price: 29.99,
    category: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    sizes: ["XS", "S", "M", "L"],
    colors: ["blue", "red", "green"],
    inStock: true
  },
  {
    _id: "p4",
    name: "Premium Pocket Tee",
    description: "Casual comfort with a stylish chest pocket detail.",
    price: 27.99,
    discount: 5,
    category: "plain",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "navy", "olive"],
    inStock: true
  },
  {
    _id: "p5",
    name: "Artist Collab Tee",
    description: "Limited edition collaboration with renowned street artist.",
    price: 49.99,
    category: "limited",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    sizes: ["M", "L", "XL"],
    colors: ["black", "white"],
    inStock: true
  },
  {
    _id: "p6",
    name: "Eco Striped Tee",
    description: "Sustainable bamboo fabric with classic stripe pattern.",
    price: 32.99,
    discount: 15,
    category: "plain",
    imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    sizes: ["S", "M", "L"],
    colors: ["blue/white", "black/gray", "green/navy"],
    inStock: true
  },
  {
    _id: "p7",
    name: "Retro Logo Tee",
    description: "Vintage-inspired logo print on heavyweight cotton.",
    price: 36.99,
    category: "vintage",
    imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["burgundy", "navy", "forest"],
    inStock: true
  },
  {
    _id: "p8",
    name: "Minimalist Embroidered Tee",
    description: "Simple elegance with subtle chest embroidery.",
    price: 39.99,
    category: "plain",
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "sand"],
    inStock: true
  }
];
