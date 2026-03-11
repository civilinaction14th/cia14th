import { cn } from "@/lib/utils";
import React from "react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const DefaultLayout = ({ children, className }: DefaultLayoutProps) => {
  return (
    <section
      className={cn(
        `relative mx-auto flex w-full flex-col gap-4 px-4 py-10 md:px-8`,
      )}
    >
      <div
        className={cn("mx-auto relative h-full w-full max-w-360", className)}
      >
        {children}
      </div>
    </section>
  );
};

export default DefaultLayout;
