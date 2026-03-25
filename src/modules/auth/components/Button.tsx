import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  children,
  isLoading,
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || props.disabled}
      className={`w-full py-2 px-6 bg-white flex items-center justify-center gap-3 rounded-[16px] font-poppins font-medium hover:cursor-pointer text-base md:text-lg border-2 border-[#F2A23A] text-[#1e1e1e] hover:bg-gray-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading ? (
        "Memproses..."
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="sm:text-base text-xs">{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
