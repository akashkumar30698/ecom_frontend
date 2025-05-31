
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import OrderComplete from "./components/checkout/OrderComplete";
import PaymentFailurePage from "./components/checkout/PaymentFailure";
import { ClerkProvider } from '@clerk/clerk-react'
import SignInPage from "./sign-in/[...sign-in]/page";
import SignUpPage from "./sign-up/[...sign-up]/page";
import AboutUs from "./pages/AboutUs";


const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
   <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/categories" element={<CategoryPage/>} />
            <Route path="/:userId/payment-success" element={<OrderComplete />} />
            <Route path="/:userId/payment-failure" element={<PaymentFailurePage />} />
            <Route path="/checkout" element={ <Checkout/>} />
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/sign-in" element={<SignInPage/>} />
            <Route path="/sign-up" element={<SignUpPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
     </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
