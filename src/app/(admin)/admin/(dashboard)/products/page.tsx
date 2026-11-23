import Link from "next/link";
import { productService } from "@/services/product.service";
import ProductTable from "@/components/admin/tables/product-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await productService.getAll();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-dark">Showcase Inventory</h1>
          <p className="text-xs text-brand-dark/60 mt-0.5">
            Manage craft items stored in Neon PostgreSQL ({products.length} total).
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Button>
        </Link>
      </div>

      <ProductTable initialProducts={products} />
    </div>
  );
}
