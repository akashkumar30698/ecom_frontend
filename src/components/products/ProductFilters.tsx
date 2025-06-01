
import  { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/types";
import axios from "axios";
import { CATEGORIES } from "@/data/mockData";

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterOptions) => void;
  setFeaturedProduct: (product) => void; // Replace `any` with appropriate product type
  className?: string;
}

const ProductFilters = ({
  categories,
  onFilterChange,
  setFeaturedProduct,
  className = "",
}: ProductFiltersProps) => {
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sizes, setSizes] = useState<Record<string, boolean>>({});
  const [colors, setColors] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<string>("");
  
  // Available filter options
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const allColors = ["white", "black", "gray", "navy", "red", "blue", "green"];
  
  const handleSizeChange = (size: string, checked: boolean) => {
    setSizes((prev) => ({ ...prev, [size]: checked }));
  };
  
  const handleColorChange = (color: string, checked: boolean) => {
    setColors((prev) => ({ ...prev, [color]: checked }));
  };
  
  const handleApplyFilters = async () => {
  const selectedSizes = Object.entries(sizes)
    .filter(([_, checked]) => checked)
    .map(([size]) => size);

  const selectedColors = Object.entries(colors)
    .filter(([_, checked]) => checked)
    .map(([color]) => color);

  const filters = {
    category: category || undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
    colors: selectedColors.length > 0 ? selectedColors : undefined,
    sortBy: sortBy as any || undefined,
  };

  // Trigger UI updates first (if needed)
  onFilterChange(filters);

  try {
    const response = await axios.get('/api/filtered', {
      params: filters,
      withCredentials: true, // if you're using cookies
    });
    
    
    if (
      typeof response.data === 'string' &&
      response.data.includes('<!DOCTYPE html>')
    ) {
      throw new Error('Received HTML instead of JSON. Check API route.');
    }

    console.log("Filtered Products:", response.data);
    setFeaturedProduct(response.data);
    // optionally update product list with response.data
  } catch (error) {
    console.error("Error fetching filtered products:", error);
  }
};
  
  const handleResetFilters = () => {
    setCategory("");
    setPriceRange([0, 100]);
    setSizes({});
    setColors({});
    setSortBy("");
    
    onFilterChange({});
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        
        <Accordion type="multiple" defaultValue={["category", "price", "size"]}>
          {/* Category Filter */}
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="all-categories"
                    checked={!category}
                    onCheckedChange={() => setCategory("")}
                  />
                  <Label
                    htmlFor="all-categories"
                    className="ml-2 text-sm cursor-pointer"
                  >
                    All Categories
                  </Label>
                </div>
                
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <Checkbox
                      id={`category-${cat}`}
                      checked={category === cat}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCategory(cat);
                        } else if (category === cat) {
                          setCategory("");
                        }
                      }}
                    />
                    <Label
                      htmlFor={`category-${cat}`}
                      className="ml-2 text-sm capitalize cursor-pointer"
                    >
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Price Range Filter */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 px-2">
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm">
                    ₹{priceRange[0]}
                  </span>
                  <span className="text-sm">
                    ₹{priceRange[1]}+
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Size Filter */}
          <AccordionItem value="size">
            <AccordionTrigger className="text-sm font-medium">Size</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {allSizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <Checkbox
                      id={`size-${size}`}
                      checked={!!sizes[size]}
                      onCheckedChange={(checked) => 
                        handleSizeChange(size, !!checked)
                      }
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Color Filter */}
          <AccordionItem value="color">
            <AccordionTrigger className="text-sm font-medium">Color</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {allColors.map((color) => (
                  <div key={color} className="flex items-center">
                    <Checkbox
                      id={`color-${color}`}
                      checked={!!colors[color]}
                      onCheckedChange={(checked) => 
                        handleColorChange(color, !!checked)
                      }
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="ml-2 text-sm capitalize cursor-pointer"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium mb-2">Sort By</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Filter Actions */}
      <div className="flex gap-2 pt-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
        <Button 
          className="flex-1 bg-navy-900 hover:bg-navy-800"
          onClick={handleApplyFilters}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
