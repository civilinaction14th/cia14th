import React, { useState, useRef, useEffect, forwardRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/src/utils/helpers/cn";

export interface DropdownFieldProps {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const DropdownField = forwardRef<HTMLInputElement, DropdownFieldProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = "Pilih salah satu...",
      required = false,
      error,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Menutup dropdown ketika klik di luar komponen
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
        {/* Label Text */}
        <label className="text-sm md:text-base font-bold font-poppins text-[#262626] ml-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Input Box Trigger */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-2.5 md:py-3 bg-white text-black font-poppins text-sm md:text-base cursor-pointer select-none",
            "border-[1.5px] border-[#F2A23A] rounded-2xl flex items-center justify-between",
            "shadow-[0_4px_4px_rgba(230,190,140,0.4)] transition-all duration-200 ease-in-out",
            "hover:bg-orange-50/50",
            isOpen && "ring-2 ring-[#8D2D2D]/50 border-[#8D2D2D]",
            error && "border-red-500 shadow-[0_4px_4px_rgba(239,68,68,0.2)]",
            className,
          )}
        >
          <span
            className={cn(
              "truncate pr-4",
              !value && "text-gray-400 font-normal",
            )}
          >
            {value || placeholder}
          </span>
          <FiChevronDown
            size={20}
            className={cn(
              "text-gray-600 transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
        </div>

        {/* 
          Hidden input digunakan supaya Dropdown ini tetap bisa dideteksi oleh form validasi bawaan HTML
          ataupun library seperti React Hook Form (jika menggunakan register) 
        */}
        <input
          type="text"
          value={value || ""}
          required={required}
          className="absolute opacity-0 -z-10 w-0 h-0"
          onChange={() => {}} // dummy onChange supaya console waring react hilang
          tabIndex={-1}
          ref={ref}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <span className="text-xs text-red-500 font-poppins ml-1">
            {error}
          </span>
        )}

        {/* Dropdown Menu Container */}
        <div
          className={cn(
            "absolute top-[calc(100%+8px)] left-0 w-full bg-white z-[60] rounded-2xl border-[1.5px] border-[#F2A23A]",
            "shadow-[0_4px_12px_rgba(230,190,140,0.4)] p-3 flex flex-col gap-2.5 overflow-y-auto max-h-72",
            "transition-all duration-200 origin-top",
            "transform",
            isOpen
              ? "scale-y-100 opacity-100 visible"
              : "scale-y-95 opacity-0 invisible pointer-events-none",
          )}
        >
          {options.length > 0 ? (
            options.map((option, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onChange?.(option);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-5 py-3 md:py-4 bg-[#EDEDED] hover:bg-[#D4D4D4] cursor-pointer rounded-xl",
                  "text-[#262626] font-poppins text-sm md:text-base font-medium transition-colors",
                  value === option &&
                    "bg-orange-100 border border-orange-300 text-[#8D2D2D]",
                )}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm font-poppins text-center">
              Tidak ada opsi tersedia
            </div>
          )}
        </div>
      </div>
    );
  },
);

DropdownField.displayName = "DropdownField";

export default DropdownField;
