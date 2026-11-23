export interface AdminNavItem {
  title: string;
  href: string;
  icon?: string;
}

export const adminNavConfig: AdminNavItem[] = [
  { title: "Dashboard", href: "/admin", icon: "📊" },
  { title: "Products", href: "/admin/products", icon: "📦" },
  { title: "Categories", href: "/admin/categories", icon: "🏷️" },
  { title: "Inquiries", href: "/admin/inquiries", icon: "💬" },
];
