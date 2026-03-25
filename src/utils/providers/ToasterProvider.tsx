"use client";

import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "bg-[#F3E6CF] text-[#262626] shadow-xl w-fill rounded-[20px] md:rounded-full px-5 py-4 flex items-center font-poppins text-sm md:text-base border-2 border-[#F2A23A]",
          title: "font-semibold text-[#262626]",
          description: "text-[#555] text-sm",
          icon: "text-[#F2A23A] flex flex-shrink-0 items-center justify-center w-7 h-7 [&>svg]:w-7 [&>svg]:h-7 mr-3",
          content: "ml-2 flex-1",
          success: "text-[#262626]",
          error: "text-[#262626]",
          info: "text-[#262626]",
        },
      }}
    />
  );
}
