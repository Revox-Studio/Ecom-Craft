import { inquiryService } from "@/services/inquiry.service";
import InquiryTable from "@/components/admin/tables/inquiry-table";
import { MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inquiries & Messages | Admin Console",
};

export default async function AdminInquiriesPage() {
  const inquiries = await inquiryService.getAll();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-brand-dark">
              Customer Inquiries
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold">
              {inquiries.length}
            </span>
          </div>
          <p className="text-xs text-brand-dark/60 mt-0.5">
            Messages and custom craft requests sent from your storefront contact form.
          </p>
        </div>
      </div>

      <InquiryTable initialInquiries={inquiries} />
    </div>
  );
}
