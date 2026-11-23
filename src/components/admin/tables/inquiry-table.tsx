"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Inquiry } from "@/types/inquiry";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Trash2,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Inbox,
  AlertTriangle,
} from "lucide-react";

interface InquiryTableProps {
  initialInquiries: Inquiry[];
}

export default function InquiryTable({
  initialInquiries,
}: InquiryTableProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete message from ${name}?`)) return;

    setDeletingId(id);
    setMessage(null);

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete inquiry");
      }

      setInquiries((prev) => prev.filter((i) => i.id !== id));
      setMessage({
        type: "success",
        text: `Message from ${name} deleted successfully.`,
      });
      router.refresh();
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Error deleting inquiry",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center justify-between border ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-[11px] font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {inquiries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-brand-dark/10 bg-white shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-brand-dark">No inquiries yet</h3>
          <p className="text-xs text-brand-dark/60 max-w-sm mx-auto">
            When customers submit questions or custom craft requests via the storefront contact form, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-5 sm:p-6 rounded-2xl border border-brand-dark/10 bg-white shadow-sm hover:border-brand-primary/30 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-dark/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {inq.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark">
                      {inq.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-brand-dark/60 mt-0.5">
                      <a
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-1 hover:text-brand-primary transition-colors font-medium"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </a>
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 hover:text-brand-primary transition-colors font-medium"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[10px] text-brand-dark/40 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    type="button"
                    disabled={deletingId === inq.id}
                    onClick={() => handleDelete(inq.id, inq.name)}
                    className="p-1.5 rounded-lg text-brand-dark/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-brand-dark/80 whitespace-pre-line leading-relaxed bg-brand-dark/[0.02] p-3.5 rounded-xl border border-brand-dark/5">
                {inq.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
