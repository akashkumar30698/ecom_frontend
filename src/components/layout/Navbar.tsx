
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "../cart/CartDrawer";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold tracking-tighter text-navy-900 md:text-2xl">
            StyleTees
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-navy-700">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium transition-colors hover:text-navy-700">
            All Products
          </Link>
          <Link to="/categories" className="text-sm font-medium transition-colors hover:text-navy-700">
            Categories
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-navy-700">
            About Us
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/account">
            <Button size="icon" variant="ghost">
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          <Button 
            size="icon" 
            variant="ghost" 
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] bg-coral text-white">
                {totalItems}
              </Badge>
            )}
            <span className="sr-only">Cart</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link to="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link to="/products" className="text-lg font-medium">
                  All Products
                </Link>
                <Link to="/categories" className="text-lg font-medium">
                  Categories
                </Link>
                <Link to="/about" className="text-lg font-medium">
                  About Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
};

export default Navbar;
