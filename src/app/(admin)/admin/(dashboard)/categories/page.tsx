import { brandConfig } from "@/config/brand";
import { Badge } from "@/components/ui/badge";

export default function AdminCategoriesPage() {
  const categories = brandConfig.categories;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-dark">Fixed Pre-Made Categories</h1>
          <p className="text-xs text-brand-dark/60 mt-0.5">
            Categories are pre-defined in <code>src/config/brand.ts</code>. Category creation is disabled.
          </p>
        </div>
        <Badge variant="primary">Permanent Taxonomy</Badge>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-plum/10 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-brand-plum/10 bg-brand-plum/[0.03] text-brand-dark/70 uppercase tracking-wider font-bold text-[10px]">
            <tr>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Configured Image Path</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-plum/10 text-brand-dark">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-brand-plum/[0.02]">
                <td className="p-4">
                  <div className="font-bold text-sm text-brand-dark">{cat.name}</div>
                  <div className="text-[11px] text-brand-dark/50">{cat.description}</div>
                </td>
                <td className="p-4 font-mono text-[11px]">{cat.slug}</td>
                <td className="p-4 font-mono text-[11px] text-brand-dark/70">
                  <code>{cat.image}</code>
                </td>
                <td className="p-4">
                  <Badge variant="success">Fixed &amp; Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
