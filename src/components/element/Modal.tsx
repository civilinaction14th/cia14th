"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BordirCard } from "./BordirCard";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  confirmText = "Lanjut",
  cancelText = "Batal",
  onConfirm,
  children,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Modal card — same style as FormContainer */}
      <BordirCard
        bg="bg-[#F3E6CF]"
        bordirColor="#F2A23A"
        bordirWidth="thick"
        className="w-full max-w-md animate-in fade-in zoom-in"
      >
        <div className="flex flex-col gap-4 sm:p-0 md:p-2 p-4">
          {/* Title */}
          <h2 className="font-publicas font-bold text-[#262626] text-xl md:text-2xl">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="font-poppins text-sm text-[#555] leading-relaxed">
              {description}
            </p>
          )}

          {/* Custom content */}
          {children}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {/* Ghost cancel button */}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 font-poppins font-bold text-sm text-[#8D2D2D] rounded-md 
                hover:bg-[#8D2D2D]/10 transition-all duration-200 cursor-pointer active:scale-95"
            >
              {cancelText}
            </button>

            {/* Primary confirm button — same style as Button.tsx */}
            <button
              type="button"
              onClick={() => {
                onConfirm?.();
              }}
              className="px-5 py-2.5 bg-[#8D2D2D] text-white font-poppins font-bold text-sm rounded-md 
                hover:bg-[#722020] transition-all duration-200 cursor-pointer active:scale-95
                shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </BordirCard>
    </div>,
    document.body,
  );
}
