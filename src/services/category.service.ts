import { Category } from "@/types/category";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    return [];
  },
  async getBySlug(slug: string): Promise<Category | null> {
    return null;
  },
  async create(data: Partial<Category>): Promise<Category | null> {
    return null;
  },
  async update(id: string, data: Partial<Category>): Promise<Category | null> {
    return null;
  },
  async delete(id: string): Promise<boolean> {
    return true;
  },
};
