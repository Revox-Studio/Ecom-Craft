import { Product } from "@/types/product";

interface ProductInfoProps {
  product?: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      {/* Product Title, SKU, Category, Tags, Description, Inquiry Button */}
    </div>
  );
}
