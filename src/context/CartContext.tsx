
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";
import { useClerk } from '@clerk/clerk-react';

type User = {
  id: string;
  username: string;
  role: 'admin' | 'user';
};



interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
    cartTotal: number;

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const { signOut } = useClerk(); // ✅ get signOut function


    // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate cart total
  //  const total = cartItems.reduce((sum, item) => {
      //return sum + (item.price * item.quantity);
    //}, 0);
    
   // setCartTotal(total);
  }, [cartItems]);

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

const login = async (
  username: string,
  password: string,
  remember: boolean
): Promise<boolean> => {
  setIsLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // if using cookies
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();

    const userData: User = data.user;

    setUser(userData);


    if (remember) {
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem("adminLog","true")
      await signOut()

    }

    if(userData)  window.location.href = `/admin?id=${userData.id || "null"}`
   
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart with the same size/color
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.product._id === product._id && 
          item.selectedSize === size && 
          item.selectedColor === color
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity in cart!`);
        return updatedItems;
      } else {
        // Add new item to cart
        toast.success(`${product.name} added to cart!`);
        return [...prevItems, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
          user,
       isAuthenticated: !!user,
        isLoading,
    login,
    logout,
    cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
