import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDropzone, FileRejection } from "react-dropzone";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { cn } from "@/src/utils/helpers/cn";
import Button from "./Button";
import { toast } from "sonner"; // Tambahkan import toast

export interface UploadModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
  maxSizeMB: number;
  accept: Record<string, string[]>;
  currentValue?: File | null;
}

const UploadModal = ({
  onClose,
  onUpload,
  maxSizeMB,
  accept,
  currentValue,
}: UploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    currentValue || null,
  );
  const [localError, setLocalError] = useState("");
  const [progress, setProgress] = useState(currentValue ? 100 : 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Kunci background biar gabisa discroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fake upload progress animation untuk UX
  useEffect(() => {
    if (!selectedFile) {
      setProgress(0);
      return;
    }

    // Jika file-nya file lama yang sudah ada di state (baru buka modal lagi), langsung 100%
    if (
      currentValue &&
      selectedFile.name === currentValue.name &&
      progress === 100
    ) {
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15; // Naik 15% setiap 50ms (cepat tapi terlihat mengisi)
      });
    }, 50);

    return () => clearInterval(interval);
  }, [selectedFile, currentValue]);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setLocalError(""); // Reset error setiap ada drop baru

      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        let errorMsg = rejection.errors[0].message;

        if (rejection.errors[0].code === "file-too-large") {
          errorMsg = `Ukuran file terlalu besar. Maksimal ${maxSizeMB} MB.`;
        } else if (rejection.errors[0].code === "file-invalid-type") {
          errorMsg = "Format file tidak didukung.";
        }

        setLocalError(errorMsg);
        toast.error(errorMsg); // Tampilkan toast error merah
        return;
      }

      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
    [maxSizeMB],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeBytes,
    maxFiles: 1,
  });

  // Extract accept keys untuk teks Supported format (misal PDF, JPG)
  const supportedFormats = Object.values(accept)
    .flat()
    .map((ext) => ext.replace(".", "").toUpperCase())
    .join(", ");

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-8">
      {/* Container Modal */}
      <div className="bg-white rounded-3xl p-6 md:p-10 w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col items-center relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {/* Tombol X Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 hover:cursor-pointer transition-colors"
        >
          <FiX size={28} />
        </button>

        <h2 className="text-3xl font-semibold font-poppins mb-8 text-black">
          Upload
        </h2>

        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className={cn(
            "w-full border-[1.5px] border-dashed rounded-md flex flex-col items-center justify-center py-10 px-4 cursor-pointer transition-colors text-center",
            isDragActive
              ? "border-amber-500 bg-orange-50"
              : "border-black hover:bg-gray-50",
          )}
        >
          <input {...getInputProps()} />
          <div className="border border-black p-2 rounded-full mb-4">
            <FiUploadCloud size={36} className="text-black" />
          </div>
          <p className="font-poppins font-semibold text-black mb-2 text-lg">
            Drag & drop files or <span className="underline">Browse</span>
          </p>
          <p className="text-sm text-gray-500 font-poppins">
            Supported format: {supportedFormats}. Maks: {maxSizeMB} MB
          </p>
        </div>

        {/* Indikator File / Uploading Box */}
        {selectedFile && (
          <div className="w-full mt-6 flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <p className="font-bold text-sm font-poppins text-black text-left">
                {progress < 100 ? "Uploading..." : "Uploaded"}
              </p>
              <p className="font-bold text-sm font-poppins text-[#8D2D2D] text-right">
                {progress}%
              </p>
            </div>

            <div className="border border-black px-4 py-3 flex items-center justify-between text-sm font-poppins w-full bg-white relative overflow-hidden">
              <span
                className={cn(
                  "truncate pr-4 w-[90%] relative z-10 transition-colors",
                  progress === 100
                    ? "text-black underline cursor-pointer"
                    : "text-black",
                )}
                onClick={() => {
                  if (progress === 100) {
                    const fileUrl = URL.createObjectURL(selectedFile);
                    window.open(fileUrl, "_blank");
                  }
                }}
                title={progress === 100 ? "Click to preview file" : ""}
              >
                {selectedFile.name}
              </span>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setProgress(0);
                }}
                className="text-gray-500 hover:text-gray-800 w-[10%] flex justify-end hover:cursor-pointer transition-colors relative z-10"
              >
                <FiX size={20} />
              </button>

              {/* Progress bar styling yang beneran jalan dan sinkron */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 h-[3px] transition-all duration-75 ease-linear",
                  progress === 100 ? "bg-emerald-500" : "bg-[#8D2D2D]",
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tombol Upload (merah) */}
        <div className="w-full mt-8">
          <Button
            type="button"
            className={cn(
              "w-full py-3.5 !rounded-md font-bold text-lg transition-all",
              progress === 100
                ? "bg-[#8D2D2D] hover:bg-[#8D2D2D]/90"
                : "bg-gray-400 opacity-70 cursor-not-allowed hover:bg-gray-400",
            )}
            onClick={() => {
              if (selectedFile && progress === 100) onUpload(selectedFile);
            }}
            disabled={!selectedFile || progress < 100}
          >
            Upload File
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default UploadModal;
