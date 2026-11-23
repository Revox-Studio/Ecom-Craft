import { db } from "@/lib/db";
import { Inquiry } from "@/types/inquiry";

export const inquiryService = {
  async getAll(): Promise<Inquiry[]> {
    try {
      const items = await db.inquiry.findMany({
        orderBy: { createdAt: "desc" },
      });

      return items.map((i) => ({
        id: i.id,
        name: i.name,
        email: i.email,
        phone: i.phone || undefined,
        productId: i.productId || undefined,
        productName: i.productName || undefined,
        message: i.message,
        status: (i.status as Inquiry["status"]) || "new",
        createdAt: i.createdAt.toISOString(),
        updatedAt: i.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      return [];
    }
  },

  async create(data: {
    name: string;
    email: string;
    phone?: string;
    productId?: string;
    productName?: string;
    message: string;
  }): Promise<Inquiry | null> {
    try {
      const item = await db.inquiry.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          productId: data.productId,
          productName: data.productName,
          message: data.message,
          status: "new",
        },
      });

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone || undefined,
        productId: item.productId || undefined,
        productName: item.productName || undefined,
        message: item.message,
        status: item.status as Inquiry["status"],
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error creating inquiry:", error);
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await db.inquiry.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      return false;
    }
  },

  async updateStatus(
    id: string,
    status: Inquiry["status"]
  ): Promise<boolean> {
    try {
      await db.inquiry.update({
        where: { id },
        data: { status },
      });
      return true;
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      return false;
    }
  },
};
