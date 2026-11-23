export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  productId?: string;
  productName?: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
  status: "new" | "in-progress" | "resolved";
}
