import React, { useState } from "react";
import { FiArrowUpCircle, FiX } from "react-icons/fi";
import { cn } from "@/src/utils/helpers/cn";
import UploadModal from "./UploadModal";

export interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  description?: string; // Text "Format penamaan file: ..."
  error?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  maxSizeMB?: number;
  accept?: Record<string, string[]>; // Contoh: { 'application/pdf': ['.pdf'] }
}

const FileUploadField = ({
  label,
  required = false,
  description,
  error,
  value,
  onChange,
  maxSizeMB = 3,
  accept = {
    "application/pdf": [".pdf"],
  },
}: FileUploadFieldProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label Text */}
      <label className="text-sm md:text-base font-normal font-poppins text-[#262626] ml-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Main Field Box (Styling mirip InputField) */}
      <div
        className={cn(
          "w-full px-4 py-3 md:py-4 bg-white rounded-2xl",
          "border-[1.5px] border-[#F2A23A] shadow-[0_4px_4px_rgba(230,190,140,0.4)]",
          "flex flex-col gap-3 transition-all",
          error && "border-red-500 shadow-[0_4px_4px_rgba(239,68,68,0.2)]",
        )}
      >
        {description && (
          <span className="text-gray-500 text-sm md:text-base font-poppins italic">
            {description}
          </span>
        )}

        {/* Jika ada file yang sudah diupload, tampilkan namanya */}
        {value && (
          <div className="flex items-center justify-between w-fit max-w-full px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-md">
            <span className="text-sm font-semibold truncate text-[#8D2D2D] font-poppins mr-3">
              File saat ini: {value.name}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange?.(null); // Hapus file dari form state
              }}
              className="text-gray-500 hover:text-gray-800 transition-colors shrink-0 p-1 hover:cursor-pointer"
              title="Hapus file"
            >
              <FiX size={18} />
            </button>
          </div>
        )}

        {/* Tombol Buka Modal */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "flex items-center gap-2 border border-black rounded-lg px-4 py-1.5 w-fit",
            "text-sm font-poppins font-medium text-black hover:bg-gray-100 transition-colors",
          )}
        >
          <FiArrowUpCircle className="text-black" size={18} />
          {value ? "Ganti file" : "Tambahkan file"}
        </button>
      </div>

      {error && (
        <span className="text-xs text-red-500 font-poppins ml-1">{error}</span>
      )}

      {/* Modal Upload Overlay */}
      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onUpload={(f) => {
            onChange?.(f);
            setIsModalOpen(false);
          }}
          maxSizeMB={maxSizeMB}
          accept={accept}
          currentValue={value}
        />
      )}
    </div>
  );
};

export default FileUploadField;
