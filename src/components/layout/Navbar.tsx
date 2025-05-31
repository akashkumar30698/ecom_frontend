
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, User, Menu, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "../cart/CartDrawer";
import { Badge } from "@/components/ui/badge";
import AdminLoginDialog from "@/pages/AdminLoginPage";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const { totalItems,isAuthenticated,user } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  const { isSignedIn } = useUser()


  const handleAdminClick = () => {
      console.log("login clicked")
    if (isAuthenticated && user?.role === 'admin' || sessionStorage.getItem("adminLog")) {
      // Navigate to admin dashboard directly
      window.location.href = '/admin';
    } else {
      // Show login dialog
      setShowLoginDialog(true);
    }
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        {/* Logo */}
        <Link to={`/?userId=${userId || "no_name" }`} className="flex items-center">
          <h1 className="text-xl font-bold tracking-tighter text-navy-900 md:text-2xl">
            StyleTees
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <Link  to={`/?userId=${userId || "no_name"}`} className="text-sm font-medium transition-colors hover:text-navy-700">
            Home
          </Link>
          <Link to={`/products?userId=${userId || "no_name"}`} className="text-sm font-medium transition-colors hover:text-navy-700">
            All Products
          </Link>
          <Link to={`/categories?userId=${userId || "no_name"}`} className="text-sm font-medium transition-colors hover:text-navy-700">
            Categories
          </Link>
          <Link to={`/about?userId=${userId || "no_name"}`} className="text-sm font-medium transition-colors hover:text-navy-700">
            About Us
          </Link>
          <button onClick={handleAdminClick}  className="text-sm font-medium transition-colors hover:text-navy-700 flex items-center">
            <Lock className="w-3 h-3 mr-1" /> Admin
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link to="/sign-in">

          {
            isSignedIn ? (
              <>
             <SignedIn>
               <UserButton />
             </SignedIn>
              </>
            ) : (
              <>
            <Button size="icon" variant="ghost">
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>
              </>
            )
          }

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
                <Link to={`/?userId=${userId || "no_name"}`} className="text-lg font-medium">
                  Home
                </Link>
                <Link to={`/products?userId=${userId || "no_name"}`}  className="text-lg font-medium">
                  All Products
                </Link>
                <Link to={`/categories?userId=${userId || "no_name"}`} className="text-lg font-medium">
                  Categories
                </Link>
                <Link to={`/about?userId=${userId || "no_name"}`} className="text-lg font-medium">
                  About Us
                </Link>
                <button onClick={handleAdminClick} className="text-lg font-medium flex items-center">
                  <Lock className="w-4 h-4 mr-2" /> Admin
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <AdminLoginDialog
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)} 
       />
    </header>

  
      
    </>
    
  );
};

export default Navbar;
