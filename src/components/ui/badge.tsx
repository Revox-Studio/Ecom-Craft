import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "plum" | "dark" | "blue" | "purple";
}

export function Badge({ className = "", variant = "primary", children, ...props }: BadgeProps) {
  const variantClasses = {
    primary: "bg-brand-pink/15 text-brand-pink border border-brand-pink/30",
    secondary: "bg-brand-orange/15 text-brand-orange border border-brand-orange/30",
    purple: "bg-brand-purple/15 text-brand-purple border border-brand-purple/30",
    plum: "bg-brand-plum/15 text-brand-plum border border-brand-plum/30",
    blue: "bg-brand-blue/15 text-brand-blue border border-brand-blue/30",
    success: "bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30",
    dark: "bg-brand-dark text-white",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
