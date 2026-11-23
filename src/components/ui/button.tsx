import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "success" | "dark" | "blue" | "purple";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }[size];

    const variantClasses = {
      default: "bg-brand-primary text-white hover:opacity-90 shadow-sm shadow-brand-primary/25",
      secondary: "bg-brand-orange text-white hover:opacity-90 shadow-sm shadow-brand-orange/25",
      purple: "bg-brand-purple text-white hover:opacity-90 shadow-sm shadow-brand-purple/25",
      blue: "bg-brand-blue text-white hover:opacity-90 shadow-sm shadow-brand-blue/25",
      success: "bg-brand-emerald text-white hover:opacity-90 shadow-sm shadow-brand-emerald/25",
      outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
      ghost: "text-brand-dark hover:bg-brand-primary/10 hover:text-brand-primary",
      dark: "bg-brand-dark text-white hover:bg-black",
    }[variant];

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
