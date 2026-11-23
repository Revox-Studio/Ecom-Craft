"use client";

import { useState } from "react";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { brandConfig } from "@/config/brand";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-brand-dark">Contact Us</h1>
        <p className="text-sm text-brand-dark/70 max-w-md mx-auto">
          Have a question, feedback, or a custom order request? Get in touch with us directly or send a message below.
        </p>
      </div>

      {/* Direct Contact Cards - Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a
          href={`mailto:${brandConfig.contact.email}`}
          className="flex items-center gap-4 p-5 rounded-2xl border border-brand-dark/10 bg-white hover:border-brand-primary/40 hover:shadow-md transition-all group"
        >
          <div className="h-11 w-11 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-brand-dark/50 uppercase tracking-wider block">Email</span>
            <span className="text-sm font-bold text-brand-dark truncate block group-hover:text-brand-primary transition-colors">
              {brandConfig.contact.email}
            </span>
          </div>
        </a>

        <a
          href={`tel:${brandConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
          className="flex items-center gap-4 p-5 rounded-2xl border border-brand-dark/10 bg-white hover:border-brand-secondary/40 hover:shadow-md transition-all group"
        >
          <div className="h-11 w-11 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Phone className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-brand-dark/50 uppercase tracking-wider block">Phone</span>
            <span className="text-sm font-bold text-brand-dark truncate block group-hover:text-brand-secondary transition-colors">
              {brandConfig.contact.phone}
            </span>
          </div>
        </a>
      </div>

      {/* Simple Contact Form */}
      <Card className="p-6 sm:p-8 rounded-2xl">
        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark">Message Sent!</h3>
            <p className="text-xs text-brand-dark/70 max-w-sm mx-auto">
              Thank you for reaching out. We have received your message and will respond to you shortly.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData({ name: "", email: "", message: "" });
                setIsSubmitted(false);
              }}
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-brand-dark mb-1.5">
                Your Name
              </label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-brand-dark mb-1.5">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-brand-dark mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
