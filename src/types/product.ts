export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  featured?: boolean;
  price?: number | string;
  originalPrice?: number | string;
  rating?: number;
  reviewCount?: number;
  specifications?: Record<string, string>;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
