export interface NavItem {
  title: string;
  href: string;
}

export const storeNavConfig: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Categories", href: "/categories" },
  { title: "Collections", href: "/collections" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
