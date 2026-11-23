import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Plus, Database, Cloud, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  adminEmail?: string;
}

export default function AdminHeader({ adminEmail }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-brand-dark/10 bg-white/80 backdrop-blur-md px-6 sm:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
          <h2 className="text-sm font-black text-brand-dark tracking-tight">
            Inventory &amp; Storage Console
          </h2>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-brand-emerald/10 text-brand-emerald text-[11px] font-bold border border-brand-emerald/20">
          Neon Active
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <div className="hidden md:flex items-center gap-3 text-brand-dark/60 text-[11px]">
          <span className="flex items-center gap-1.5 font-semibold">
            <Database className="w-3.5 h-3.5 text-brand-emerald" />
            <span>PostgreSQL</span>
          </span>
          <span className="text-brand-dark/20">|</span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Cloud className="w-3.5 h-3.5 text-brand-primary" />
            <span>Neon S3</span>
          </span>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 px-3.5 py-2 font-bold text-white shadow-sm shadow-brand-primary/20 transition-all text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Craft Item</span>
        </Link>
      </div>
    </header>
  );
}
