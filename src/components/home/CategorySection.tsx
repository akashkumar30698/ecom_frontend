
import { Category } from "@/types";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-heading mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our collection by style</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}&userId=${userId}`}>
              <Card className="overflow-hidden group">
                <div className="relative h-60 product-card-zoom">
                  <img
                    src={"#"}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="text-lg font-medium group-hover:underline">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
