import React, { useState } from "react";

const InputField = ({
  title,
  placeholder,
  type,
  value,
  onChange,
  icon,
  name,
  errorText,
}: {
  title: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  name?: string;
  errorText?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Jika tipenya password dan sedang toggle, jadikan text
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-publicas text-white text-base md:text-lg">
        {title}
      </label>
      <div className={`flex items-center gap-3 border-b pb-2 w-full relative ${errorText ? "border-red-400" : "border-white"}`}>
        {icon && <span className="shrink-0 text-white/80">{icon}</span>}
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-transparent border-none outline-none text-white placeholder:text-white/60 w-full font-poppins text-sm md:text-base pr-8"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 text-white/80 hover:text-white transition-colors focus:outline-none shrink-0"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {showPassword ? (
              // Mata Terbuka (Melihat password)
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Mata Tertutup (Menyembunyikan password)
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            )}
          </button>
        )}
      </div>
      {errorText && (
        <p className="text-red-400 text-xs font-poppins mt-0.5">{errorText}</p>
      )}
    </div>
  );
};

export default InputField;
