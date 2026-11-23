"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { Product } from "@/types/product";
import ImageUpload from "./image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { slugify } from "@/lib/utils";

interface ProductFormProps {
  initialData?: Partial<Product>;
  isEditing?: boolean;
  productId?: string;
}

export default function ProductForm({
  initialData,
  isEditing = false,
  productId,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugManuallyChanged, setSlugManuallyChanged] = useState(
    Boolean(initialData?.slug)
  );
  const [category, setCategory] = useState(
    initialData?.category || brandConfig.categories[0]?.name || "Winter Crochet"
  );
  const [price, setPrice] = useState(
    initialData?.price ? String(initialData.price) : "₹599"
  );
  const [originalPrice, setOriginalPrice] = useState(
    initialData?.originalPrice ? String(initialData.originalPrice) : "₹799"
  );
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [tags, setTags] = useState(
    Array.isArray(initialData?.tags) ? initialData.tags.join(", ") : ""
  );
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // Specifications key-value pairs
  const initialSpecs = initialData?.specifications || {};
  const [specsList, setSpecsList] = useState<Array<{ key: string; value: string }>>(
    Object.entries(initialSpecs)
      .filter(([k]) => k !== "price" && k !== "originalPrice")
      .map(([k, v]) => ({ key: k, value: String(v) }))
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slugManuallyChanged && !isEditing) {
      setSlug(slugify(val));
    }
  };

  const handleAddSpec = () => {
    setSpecsList([...specsList, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecsList(specsList.filter((_, idx) => idx !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specsList];
    updated[index][field] = val;
    setSpecsList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Product name is required");
      return;
    }
    if (!category.trim()) {
      setError("Category is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Build specs object
    const specificationsObj: Record<string, string> = {};
    specsList.forEach((item) => {
      if (item.key.trim() && item.value.trim()) {
        specificationsObj[item.key.trim()] = item.value.trim();
      }
    });

    const parsedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      name: name.trim(),
      slug: (slug || slugify(name)).trim(),
      category: category.trim(),
      price: price.trim(),
      originalPrice: originalPrice.trim(),
      description: description.trim(),
      featured,
      images,
      specifications: specificationsObj,
      tags: parsedTags,
    };

    try {
      const endpoint = isEditing && productId
        ? `/api/products/${productId}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      setSuccess(
        isEditing
          ? "Product updated successfully!"
          : "Product created successfully!"
      );

      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark/60 hover:text-brand-primary mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">
            {isEditing ? `Edit: ${initialData?.name || "Product"}` : "Add New Craft Item"}
          </h1>
          <p className="text-xs text-brand-dark/60 mt-0.5">
            {isEditing
              ? "Update details, pricing, tags, and S3 images in Neon database."
              : "Upload images to Neon S3 storage and publish directly to your showcase catalog."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button type="button" variant="outline" size="sm">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Save className="w-4 h-4" />
                <span>{isEditing ? "Save Changes" : "Publish Product"}</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{success} Redirecting to inventory...</span>
        </div>
      )}

      {/* Section 1: Basic Info */}
      <Card className="p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-bold text-brand-dark border-b border-brand-dark/10 pb-3">
          General Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
              Product Title *
            </label>
            <Input
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Royal Bal Gopal Woolen Poshak"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
              URL Slug *
            </label>
            <Input
              required
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugManuallyChanged(true);
              }}
              placeholder="royal-bal-gopal-woolen-poshak"
            />
            <span className="text-[10px] text-brand-dark/50 block">
              Direct link: /products/{slug || "slug"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-dark/20 text-sm bg-white text-brand-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            >
              {brandConfig.categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
              Selling Price (INR)
            </label>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₹599"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
              Original / MRP (INR)
            </label>
            <Input
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="₹799"
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-brand-primary accent-brand-primary focus:ring-brand-primary"
            />
            <div>
              <span className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                Feature this craft on homepage
              </span>
              <span className="text-[11px] text-brand-dark/60 block">
                Highlighted in the &quot;Featured Creations&quot; showcase section.
              </span>
            </div>
          </label>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
            Description *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of craftsmanship, stitches, soft yarn quality, and unique features..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-dark/20 text-sm text-brand-dark placeholder:text-brand-dark/35 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark/70">
            Tags (Comma separated)
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Crochet, Handmade, Deity Poshak, Winter, Gift"
          />
          {tags && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-brand-dark/5 text-brand-dark/70 text-[10px] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </Card>

      {/* Section 2: Neon S3 Media */}
      <Card className="p-6 sm:p-8">
        <h3 className="text-base font-bold text-brand-dark border-b border-brand-dark/10 pb-3 mb-6">
          Media Gallery
        </h3>
        <ImageUpload images={images} onChange={setImages} />
      </Card>

      {/* Section 3: Craft Specifications */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-brand-dark/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-brand-dark">
              Specifications &amp; Artisan Details
            </h3>
            <p className="text-xs text-brand-dark/60 mt-0.5">
              Material, dimensions, care instructions, yarn type, etc.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSpec}
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Detail</span>
          </Button>
        </div>

        {specsList.length === 0 ? (
          <p className="text-xs text-brand-dark/50 py-3 italic">
            No custom specifications added yet. Click &quot;+ Add Detail&quot; to specify Yarn type, Dimensions, etc.
          </p>
        ) : (
          <div className="space-y-3 pt-2">
            {specsList.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Detail name (e.g. Yarn / Material)"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecChange(index, "key", e.target.value)
                  }
                  className="w-1/3 px-3 py-2 rounded-xl border border-brand-dark/20 text-xs text-brand-dark focus:outline-none focus:border-brand-primary"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 100% Export-Grade Soft Wool)"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  className="flex-1 px-3 py-2 rounded-xl border border-brand-dark/20 text-xs text-brand-dark focus:outline-none focus:border-brand-primary"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(index)}
                  className="p-2 text-brand-dark/40 hover:text-red-600 rounded-lg transition-colors"
                  title="Remove detail"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-dark/10">
        <Link href="/admin/products">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          disabled={loading}
          className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-6"
        >
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Publish Product"}
        </Button>
      </div>
    </form>
  );
}
