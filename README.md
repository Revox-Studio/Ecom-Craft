# EcomCraft - Product Showcase & Admin Architecture

A Next.js (App Router) + TypeScript catalog and showcase application designed specifically for showcasing products without user registration, authentication, or purchase/checkout overhead.

---

## 📁 Project Architecture & Folder Structure

```text
Ecom-Craft/
├── public/                               # Static assets (images, icons, etc.)
│   ├── images/
│   │   ├── banners/                      # Promotional & hero banners
│   │   ├── categories/                   # Category thumbnail images
│   │   └── products/                     # Product catalog photos & galleries
│   └── icons/                            # Brand & UI icons
│
├── src/
│   ├── app/                              # Next.js App Router root
│   │   ├── (store)/                      # Route Group: Public Storefront (Showcase)
│   │   │   ├── layout.tsx                # Storefront layout (Navbar + Footer)
│   │   │   ├── page.tsx                  # Home / Hero & Featured Showcase
│   │   │   ├── products/
│   │   │   │   ├── page.tsx              # Product catalog with filters & sorting
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx          # Single product detail view
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx              # Category listing page
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx          # Products filtered by category
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx              # Lookbooks & curated collections
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx          # Collection detail
│   │   │   ├── search/
│   │   │   │   └── page.tsx              # Product search results
│   │   │   ├── about/
│   │   │   │   └── page.tsx              # Brand story & craft details
│   │   │   └── contact/
│   │   │       └── page.tsx              # Contact & Product inquiry form
│   │   │
│   │   ├── (admin)/                      # Route Group: Admin Dashboard
│   │   │   └── admin/
│   │   │       ├── layout.tsx            # Admin dashboard layout (Sidebar + Header)
│   │   │       ├── page.tsx              # Dashboard overview & stats
│   │   │       ├── products/
│   │   │       │   ├── page.tsx          # Product management table
│   │   │       │   ├── new/
│   │   │       │   │   └── page.tsx      # Add product form
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx  # Edit product
│   │   │       ├── categories/
│   │   │       │   ├── page.tsx          # Category management list
│   │   │       │   └── new/
│   │   │       │       └── page.tsx      # Add category form
│   │   │       ├── banners/
│   │   │       │   └── page.tsx          # Hero banner management
│   │   │       ├── inquiries/
│   │   │       │   └── page.tsx          # Customer inquiries & lead list
│   │   │       └── settings/
│   │   │           └── page.tsx          # Store details & showcase settings
│   │   │
│   │   ├── api/                          # Next.js Route Handlers (REST endpoints)
│   │   │   ├── products/
│   │   │   │   ├── route.ts              # GET / POST products
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts          # GET / PUT / DELETE product by id
│   │   │   ├── categories/
│   │   │   │   └── route.ts              # GET / POST categories
│   │   │   ├── banners/
│   │   │   │   └── route.ts              # GET / POST banners
│   │   │   └── inquiries/
│   │   │       └── route.ts              # GET / POST customer inquiries
│   │   │
│   │   ├── error.tsx                     # Global error boundary
│   │   ├── globals.css                   # Tailwind and base styling
│   │   ├── layout.tsx                    # Root HTML/Body layout
│   │   ├── loading.tsx                   # Global loading state
│   │   └── not-found.tsx                 # Global 404 page
│   │
│   ├── components/                       # React components
│   │   ├── admin/                        # Admin-specific components
│   │   │   ├── header/admin-header.tsx
│   │   │   ├── sidebar/admin-sidebar.tsx
│   │   │   ├── product-form/
│   │   │   │   ├── product-form.tsx
│   │   │   │   └── image-upload.tsx
│   │   │   ├── category-form/category-form.tsx
│   │   │   └── tables/
│   │   │       ├── product-table.tsx
│   │   │       └── inquiry-table.tsx
│   │   │
│   │   ├── store/                        # Storefront-specific components
│   │   │   ├── header/
│   │   │   │   ├── navbar.tsx
│   │   │   │   └── search-bar.tsx
│   │   │   ├── footer/footer.tsx
│   │   │   ├── home/
│   │   │   │   ├── hero-banner.tsx
│   │   │   │   └── featured-products.tsx
│   │   │   ├── product/
│   │   │   │   ├── product-card.tsx
│   │   │   │   ├── product-grid.tsx
│   │   │   │   ├── product-gallery.tsx
│   │   │   │   ├── product-info.tsx
│   │   │   │   └── product-specifications.tsx
│   │   │   ├── category/category-card.tsx
│   │   │   └── filter/
│   │   │       ├── product-filters.tsx
│   │   │       └── sort-dropdown.tsx
│   │   │
│   │   └── ui/                           # Base UI elements
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── table.tsx
│   │
│   ├── config/                           # Application configuration
│   │   ├── admin-nav.ts                  # Admin navigation items
│   │   ├── site.ts                       # Store showcase metadata
│   │   └── store-nav.ts                  # Public navigation links
│   │
│   ├── hooks/                            # Custom React Hooks
│   │   ├── use-debounce.ts               # Search debounce hook
│   │   └── use-product-filter.ts         # Client filter state hook
│   │
│   ├── lib/                              # Shared libraries & utilities
│   │   ├── db.ts                         # Database client setup
│   │   ├── utils.ts                      # Helper functions (cn, slugify, etc.)
│   │   └── validations/                  # Form/API schemas
│   │       ├── category.ts
│   │       ├── inquiry.ts
│   │       └── product.ts
│   │
│   ├── services/                         # Business logic & data fetching
│   │   ├── banner.service.ts
│   │   ├── category.service.ts
│   │   ├── inquiry.service.ts
│   │   └── product.service.ts
│   │
│   └── types/                            # TypeScript interfaces & types
│       ├── banner.ts
│       ├── category.ts
│       ├── inquiry.ts
│       ├── product.ts
│       └── index.ts
│
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Navigate**:
   - Storefront showcase: `http://localhost:3000`
   - Admin management: `http://localhost:3000/admin`
