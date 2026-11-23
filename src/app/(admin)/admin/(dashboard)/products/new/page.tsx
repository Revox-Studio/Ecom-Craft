import ProductForm from "@/components/admin/product-form/product-form";

export const metadata = {
  title: "Add New Product | Admin Console",
};

export default function NewProductPage() {
  return <ProductForm isEditing={false} />;
}
