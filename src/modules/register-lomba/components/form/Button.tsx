import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/src/utils/helpers/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "py-2.5 px-10 bg-[#8D2D2D] text-white font-poppins font-bold rounded-md",
          "hover:bg-[#722020] transition-all duration-200 ease-in-out active:scale-95 hover:cursor-pointer",
          "flex items-center justify-center gap-2",
          "shadow-[0_4px_4px_rgba(0,0,0,0.25)]", // Tambahan shadow agar sedikit timbul
          (isLoading || disabled) &&
            "opacity-70 cursor-not-allowed pointer-events-none", // State jika disable/loading
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
