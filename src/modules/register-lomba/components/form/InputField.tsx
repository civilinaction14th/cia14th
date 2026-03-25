import React, { forwardRef } from "react";
import { cn } from "@/src/utils/helpers/cn";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, required = false, className, error, id, ...props }, ref) => {
    const inputId = id || `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label Text */}
        <label
          htmlFor={inputId}
          className="text-sm md:text-base font-normal font-poppins text-[#262626] ml-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>

        {/* Input */}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "form-input-white", // Tambahan class untuk fix autofill khusus background putih
            "w-full px-4 py-2.5 md:py-3 bg-white text-black font-poppins text-sm md:text-base",
            "border-[1.5px] border-[#F2A23A] rounded-2xl",
            "shadow-lg", // Shadow soft orange yang mirip gambar
            "outline-none focus:ring-2 focus:ring-[#F2A23A]",
            "transition-all duration-200 ease-in-out",
            "placeholder:text-gray-400 placeholder:font-normal",
            error &&
              "border-red-500 shadow-[0_4px_4px_rgba(239,68,68,0.2)] focus:ring-red-500/50", // Styling jika error
            className,
          )}
          {...props}
        />

        {/* Pesan Error */}
        {error && (
          <span className="text-xs text-red-500 font-poppins ml-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
