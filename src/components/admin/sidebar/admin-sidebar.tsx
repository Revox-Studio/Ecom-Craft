"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { brandConfig } from "@/config/brand";
import { adminNavConfig } from "@/config/admin-nav";
import { LogOut, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";

interface AdminSidebarProps {
  adminEmail?: string;
}

export default function AdminSidebar({
  adminEmail = "admin@ecomcraft.com",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-brand-dark/20 bg-brand-dark text-white flex flex-col justify-between p-5 min-h-screen sticky top-0 h-screen select-none">
      <div>
        {/* Brand Header */}
        <Link href="/admin" className="flex items-center gap-3 mb-8 px-2 group">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-primary to-pink-500 flex items-center justify-center font-black text-white text-base shadow-md shadow-brand-primary/30 group-hover:scale-105 transition-transform">
            {brandConfig.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <span className="text-lg font-black tracking-tight block leading-tight">
              {brandConfig.name}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary block">
              Showcase Admin
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {adminNavConfig.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 translate-x-1"
                    : "text-white/75 hover:bg-white/10 hover:text-white hover:translate-x-1"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls: Current Admin, View Storefront & Logout */}
      <div className="border-t border-white/10 pt-4 space-y-3">
        {/* Logged in admin pill */}
        <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-secondary/20 text-brand-secondary flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-white/50 block tracking-wider">
              Signed in
            </span>
            <span className="text-xs font-bold text-white truncate block">
              {adminEmail}
            </span>
          </div>
        </div>

        {/* View Storefront */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all group"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-brand-secondary" />
            <span>Live Storefront</span>
          </span>
          <span className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse" />
        </Link>

        {/* Sign out */}
        <button
          type="button"
          disabled={loggingOut}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-all disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
