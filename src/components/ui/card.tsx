import React from "react";

export function Card({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-brand-plum/10 bg-white p-6 shadow-sm transition-all duration-200 hover:border-brand-magenta/30 hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
