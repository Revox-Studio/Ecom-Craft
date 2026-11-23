"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Edit,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Cloud,
  CheckCircle2,
  Filter,
  Package,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

interface ProductTableProps {
  initialProducts: Product[];
}

export default function ProductTable({ initialProducts }: ProductTableProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(brandConfig.categories.map((c) => c.name))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

    const matchesCategory =
      selectedCategory === "all" ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      // Remove from client state immediately
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setMessage({
        type: "success",
        text: `"${productToDelete.name}" deleted from database and image(s) removed from S3 bucket.`,
      });
      setProductToDelete(null);
      router.refresh();
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Error deleting product",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Notifications */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-sm flex items-center justify-between border ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs font-bold underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-brand-dark/10 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, slug, or tags..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-dark/15 text-brand-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-brand-dark/40 hidden sm:block" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-brand-dark/15 text-brand-dark bg-white focus:outline-none focus:border-brand-primary"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories
              .filter((c) => c !== "all")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-brand-dark/10 bg-brand-dark/[0.02] text-brand-dark/60 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Craft Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Highlight</th>
                <th className="p-4">S3 Images</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/10 text-brand-dark">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brand-dark/50">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold">No craft items found</p>
                    <p className="text-xs text-brand-dark/40 mt-1">
                      {search || selectedCategory !== "all"
                        ? "Try adjusting your search query or category filter."
                        : "Click '+ Add New Product' to publish your first handcrafted item."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const coverImage = p.images && p.images.length > 0 ? p.images[0] : null;
                  const hasS3Images = p.images && p.images.some((img) => !img.startsWith("/images/"));

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-brand-dark/[0.015] transition-colors"
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-brand-dark/5 overflow-hidden shrink-0 border border-brand-dark/10 relative">
                            {coverImage ? (
                              <img
                                src={coverImage}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-brand-dark/30 text-xs">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-sm text-brand-dark truncate max-w-[220px]">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-brand-dark/40 font-mono truncate max-w-[200px]">
                              /products/{p.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <Badge variant="secondary" className="font-medium">
                          {p.category}
                        </Badge>
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <div className="font-bold text-sm text-brand-dark">
                          {p.price || "₹599"}
                        </div>
                        {p.originalPrice && (
                          <div className="text-[10px] text-brand-dark/40 line-through">
                            {p.originalPrice}
                          </div>
                        )}
                      </td>

                      {/* Status / Featured */}
                      <td className="p-4">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-brand-dark/5 text-brand-dark/60 text-[10px] font-medium">
                            Standard
                          </span>
                        )}
                      </td>

                      {/* Media on S3 */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Cloud className={`w-3.5 h-3.5 ${hasS3Images ? "text-brand-emerald" : "text-brand-dark/40"}`} />
                          <span className={hasS3Images ? "text-brand-emerald font-semibold" : "text-brand-dark/60"}>
                            {p.images?.length || 0} image(s)
                          </span>
                        </div>
                      </td>

                      {/* Actions: View, Edit, Delete */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            title="View product in live storefront"
                            className="p-1.5 rounded-lg text-brand-dark/60 hover:text-brand-primary hover:bg-brand-primary/10 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            title="Edit craft details"
                            className="p-1.5 rounded-lg text-brand-dark/70 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setProductToDelete(p)}
                            title="Delete product and remove S3 images"
                            className="p-1.5 rounded-lg text-brand-dark/70 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-brand-dark/15 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-brand-dark">
                  Delete Product &amp; Images?
                </h3>
                <span className="text-xs text-red-600 font-semibold">
                  Permanent Action
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-brand-dark/5 border border-brand-dark/10 flex items-center gap-3">
              {productToDelete.images?.[0] && (
                <img
                  src={productToDelete.images[0]}
                  alt=""
                  className="w-12 h-12 object-cover rounded-xl"
                />
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-brand-dark truncate">
                  {productToDelete.name}
                </p>
                <p className="text-[11px] text-brand-dark/50">
                  {productToDelete.images?.length || 0} photo(s) in S3 bucket
                </p>
              </div>
            </div>

            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Are you sure you want to delete this craft item? It will be{" "}
              <strong className="text-brand-dark">permanently removed from the database</strong>{" "}
              and all of its associated image files will be{" "}
              <strong className="text-brand-dark">deleted from your Neon S3 bucket</strong>.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isDeleting}
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {isDeleting ? "Deleting from DB & S3..." : "Yes, Delete Everything"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
