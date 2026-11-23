import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product.service";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/products"
          className="text-xs font-semibold text-brand-dark/70 hover:text-brand-magenta transition-colors"
        >
          &larr; Back to Catalog Showcase
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Media Showcase */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-plum/15 bg-gradient-to-tr from-brand-dark/10 via-brand-plum/15 to-brand-magenta/20 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-7xl">🏺</span>
          )}

          {product.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary">Featured Craft</Badge>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge variant="success">Available for Commission</Badge>
          </div>
        </div>

        {/* Product Details & Specifications */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              {product.category}
            </span>
            <h1 className="text-3xl font-black text-brand-dark">{product.name}</h1>
            <p className="text-sm text-brand-dark/80 leading-relaxed">
              {product.description}
            </p>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="rounded-xl border border-brand-plum/10 bg-white p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Craft Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-brand-dark/80">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key}>
                      <span className="font-semibold">{key}:</span> {String(val)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-plum/10 px-2.5 py-0.5 text-[11px] font-medium text-brand-plum"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action: Inquire */}
          <div className="space-y-3 border-t border-brand-plum/10 pt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-emerald">
              <span className="h-2 w-2 rounded-full bg-brand-emerald"></span>
              Catalog Item Only (No online purchase / direct studio inquiry)
            </div>
            <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="block">
              <Button variant="default" size="lg" className="w-full">
                Inquire About &quot;{product.name}&quot; &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
