import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`flex h-10 w-full rounded-lg border border-brand-dark/20 bg-white px-3 py-2 text-sm text-brand-dark transition-colors placeholder:text-brand-dark/40 focus:border-brand-magenta focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
