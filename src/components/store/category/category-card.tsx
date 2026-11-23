import { Category } from "@/types/category";

interface CategoryCardProps {
  category?: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="rounded-lg border p-4 text-center">
      {/* Category Image, Name, Product Count */}
    </div>
  );
}
