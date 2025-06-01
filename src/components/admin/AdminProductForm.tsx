
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types";
import { CATEGORIES } from "@/data/mockData";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  discount: z.coerce.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%").optional(),
  category: z.string().min(1, "Please select a category"),
  imageUrl: z.string().url("Please enter a valid URL"),
  inStock: z.boolean().default(true),
  sizes: z.string().min(1, "Please enter at least one size"),
  colors: z.string().min(1, "Please enter at least one color"),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface AdminProductFormProps {
  product?: ProductExtra;
  onSave?: (product: ProductExtra) => void;
  onCancel: () => void;
}

interface ProductExtra {
  searchByUniqueId?: string
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

const AdminProductForm = ({ product, onSave, onCancel }: AdminProductFormProps) => {
  const { toast } = useToast();

  const defaultValues: Partial<ProductFormValues> = product
    ? {
      ...product,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
    }
    : {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      imageUrl: "",
      inStock: true,
      sizes: "S, M, L, XL",
      colors: "black, white",
    };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

 const onSubmit = async (data: ProductFormValues) => {
  const isEdit = Boolean(product ? true : false); // true if editing

  const formattedProduct: ProductExtra = {
    searchByUniqueId: isEdit ? product?.searchByUniqueId : uuidv4() ,
    name: data.name,
    description: data.description,
    price: data.price,
    discount: data.discount || undefined,
    category: data.category,
    imageUrl: data.imageUrl,
    inStock: data.inStock,
    sizes: data.sizes.split(",").map(size => size.trim()),
    colors: data.colors.split(",").map(color => color.trim()),
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/products${isEdit ? `/${formattedProduct.searchByUniqueId}` : ""}`,
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProduct),
      }
    );

    if (!response.ok) {
      throw new Error(isEdit ? "Failed to update product" : "Failed to add product");
    }

    const result = await response.json();

    toast({
      title: isEdit ? "Product updated" : "Product added",
      description: `The product has been ${isEdit ? "updated" : "added"} successfully.`,
      variant: "default",
    });

    if (onSave) {
      onSave(result);
    } else {
      form.reset();
    }
  } catch (error) {
    toast({
      title: "Error",
      description: (error as Error).message,
      variant: "destructive",
    });
  }
};



  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Classic White Tee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`); // 🔁 Replace with your upload preset

                            try {
                              const res = await fetch(
                                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, // 🔁 Replace with your Cloudinary cloud name
                                {
                                  method: "POST",
                                  body: formData,
                                }
                              );
                              const data = await res.json();
                              field.onChange(data.secure_url); // ✅ Set imageUrl field
                            } catch (err) {
                              console.error("Cloudinary upload failed", err);
                            }
                          }}
                        />
                        {field.value && (
                          <img
                            src={field.value}
                            alt="Uploaded preview"
                            className="mt-2 max-h-48 rounded border"
                          />
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">In Stock</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="S, M, L, XL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="black, white, blue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A timeless plain white t-shirt made from 100% organic cotton."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-navy-800 hover:bg-navy-700">
                {product ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminProductForm;
