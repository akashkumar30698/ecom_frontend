
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/mockData";
import AdminProductForm from "./AdminProductForm";

const AdminProductList = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed successfully.",
      variant: "default",
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    toast({
      title: "Product updated",
      description: "The product has been updated successfully.",
      variant: "default",
    });
  };

  if (editingProduct) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <AdminProductForm 
          product={editingProduct} 
          onSave={handleUpdateProduct} 
          onCancel={() => setEditingProduct(null)} 
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{product.category}</Badge>
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>
                {product.inStock ? (
                  <Badge className="bg-green-500">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setEditingProduct(product)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the product "{product.name}". 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductList;
