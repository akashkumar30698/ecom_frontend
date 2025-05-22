
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AdminPage = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold text-navy-900">Admin Dashboard</h1>
          {!isAddingProduct && (
            <Button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-navy-800 hover:bg-navy-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          )}
        </div>

        {isAddingProduct ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <AdminProductForm onCancel={() => setIsAddingProduct(false)} />
          </div>
        ) : (
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="products" className="text-base">Products</TabsTrigger>
              <TabsTrigger value="categories" className="text-base">Categories</TabsTrigger>
              <TabsTrigger value="orders" className="text-base">Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="bg-white rounded-lg shadow-md">
              <AdminProductList />
            </TabsContent>
            
            <TabsContent value="categories" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Category Management</h2>
              <p className="text-muted-foreground">Category management functionality coming soon.</p>
            </TabsContent>
            
            <TabsContent value="orders" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              <p className="text-muted-foreground">Order management functionality coming soon.</p>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
