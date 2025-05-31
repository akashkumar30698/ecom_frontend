
import CategorySection from "@/components/home/CategorySection"
import { CATEGORIES } from "@/data/mockData"

const CategoryPage = () => {
    return (
        <>
       <CategorySection categories={CATEGORIES} />

        </>
    )
}

export default CategoryPage