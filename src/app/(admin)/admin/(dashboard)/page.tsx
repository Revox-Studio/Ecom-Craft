import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { brandConfig } from "@/config/brand";
import {
  Package,
  Sparkles,
  MessageSquare,
  Layers,
  ArrowRight,
  ExternalLink,
  Plus,
  Cloud,
  Database,
  Edit,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, featuredCount, inquiryCount, recentProducts] =
    await Promise.all([
      db.product.count().catch(() => 0),
      db.product.count({ where: { featured: true } }).catch(() => 0),
      db.inquiry.count().catch(() => 0),
      db.product
        .findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        })
        .catch(() => []),
    ]);

  const stats = [
    {
      title: "Inventory Products",
      value: String(productCount),
      subtitle: `${featuredCount} featured items`,
      icon: Package,
      badge: "PostgreSQL",
      color: "border-l-4 border-l-brand-primary",
    },
    {
      title: "Customer Inquiries",
      value: String(inquiryCount),
      subtitle: "From contact form",
      icon: MessageSquare,
      badge: "Active",
      color: "border-l-4 border-l-brand-emerald",
    },
    {
      title: "Fixed Categories",
      value: String(brandConfig.categories.length),
      subtitle: "Pre-defined taxonomy",
      icon: Layers,
      badge: "Configured",
      color: "border-l-4 border-l-blue-500",
    },
    {
      title: "S3 Object Storage",
      value: "Neon S3",
      subtitle: "Bucket: ecom-products",
      icon: Cloud,
      badge: "ap-southeast-1",
      color: "border-l-4 border-l-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/60">
              Live Console
            </span>
          </div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">
            {brandConfig.name} Admin Dashboard
          </h1>
          <p className="text-xs text-brand-dark/60 mt-0.5">
            Manage your artisanal wool craft inventory, media uploads on Neon S3, and customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold flex items-center gap-1.5 shadow-sm shadow-brand-primary/25">
              <Plus className="w-4 h-4" />
              <span>Add New Craft</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" className="flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Brand Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.title}
              className={`${s.color} hover:translate-y-[-2px] transition-transform p-5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark/60">
                  {s.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-brand-dark/5 text-brand-dark/70 text-[10px] font-bold">
                  {s.badge}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black text-brand-dark">
                  {s.value}
                </span>
                <Icon className="w-5 h-5 text-brand-dark/20" />
              </div>
              <p className="text-[11px] text-brand-dark/50 mt-1">
                {s.subtitle}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-brand-dark">
              Recent Inventory Additions
            </h3>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
            >
              <span>View All ({productCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-brand-dark/10 bg-white shadow-sm overflow-hidden divide-y divide-brand-dark/5">
            {recentProducts.length === 0 ? (
              <div className="p-8 text-center text-xs text-brand-dark/50">
                No products found in database. Click &quot;Add New Craft&quot; to begin.
              </div>
            ) : (
              recentProducts.map((p) => {
                const coverImage = p.images && p.images[0] ? p.images[0] : null;
                const specs = (p.specifications as Record<string, any>) || {};

                return (
                  <div
                    key={p.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-brand-dark/[0.015] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-brand-dark/5 overflow-hidden shrink-0 border border-brand-dark/10">
                        {coverImage ? (
                          <img
                            src={coverImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand-dark/30 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-brand-dark truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-brand-dark/50 mt-0.5">
                          <span className="font-medium text-brand-primary">
                            {p.category}
                          </span>
                          <span>&bull;</span>
                          <span>{p.images?.length || 0} photo(s) in S3</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-brand-dark">
                        {specs.price || "₹599"}
                      </span>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-1.5 rounded-lg text-brand-dark/60 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-brand-dark">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-4 rounded-2xl bg-brand-primary text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary/95 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Add New Craft</h4>
                  <p className="text-[11px] text-white/80">
                    Upload images to S3 &amp; publish
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-dark/10 shadow-sm hover:border-brand-primary/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-dark/5 text-brand-dark flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">
                    Manage Products
                  </h4>
                  <p className="text-[11px] text-brand-dark/60">
                    Edit pricing, tags &amp; delete
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-dark/40 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/inquiries"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-dark/10 shadow-sm hover:border-brand-primary/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-dark/5 text-brand-dark flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">
                    Customer Inquiries
                  </h4>
                  <p className="text-[11px] text-brand-dark/60">
                    Read messages &amp; requests
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-dark/40 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-dark/10 shadow-sm hover:border-brand-primary/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-dark/5 text-brand-dark flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">
                    View Categories
                  </h4>
                  <p className="text-[11px] text-brand-dark/60">
                    5 pre-configured taxonomies
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-dark/40 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
