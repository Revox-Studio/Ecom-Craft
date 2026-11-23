import Link from "next/link";
import { productService } from "@/services/product.service";
import ProductForm from "@/components/admin/product-form/product-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await productService.getById(id);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-brand-dark">Product Not Found</h2>
        <p className="text-xs text-brand-dark/60">
          The craft item with ID <code className="font-mono text-brand-dark">{id}</code> could not be found in the database.
        </p>
        <Link href="/admin/products">
          <Button variant="outline" size="sm" className="mt-2">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <ProductForm
      isEditing={true}
      productId={id}
      initialData={product}
    />
  );
}
