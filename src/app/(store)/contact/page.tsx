import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { brandConfig } from "@/config/brand";
import ContactForm from "@/components/store/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us & Custom Orders",
  description: `Get in touch with ${brandConfig.name} for custom orders, bulk inquiries, or questions about our handcrafted crochet items. We dispatch pan-India.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact Us & Custom Orders | ${brandConfig.name}`,
    description: `Get in touch with ${brandConfig.name} for custom orders, bulk inquiries, or questions about our handcrafted crochet items.`,
    url: `${brandConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${brandConfig.name}`,
    description: `Contact details and custom orders for ${brandConfig.name}`,
    url: `${brandConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: brandConfig.name,
      telephone: brandConfig.contact.phone,
      email: brandConfig.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: brandConfig.contact.address,
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: brandConfig.contact.phone,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi", "Bengali"],
      },
    },
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

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
      <ContactForm />
    </div>
  );
}
