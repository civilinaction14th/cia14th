import React, { FormHTMLAttributes } from "react";
import { BordirCard } from "@/src/components/element/BordirCard";
import { cn } from "@/src/utils/helpers/cn";

export interface FormContainerProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}

const FormContainer = ({
  children,
  className,
  ...props
}: FormContainerProps) => {
  return (
    <BordirCard
      bg="bg-[#F3E6CF]"
      bordirColor="#F2A23A"
      bordirWidth="thick"
      className="w-full h-full p-4 md:p-8"
    >
      <form
        className={cn("w-full flex flex-col gap-6 md:gap-8", className)}
        noValidate
        {...props}
      >
        {children}
      </form>
    </BordirCard>
  );
};

export default FormContainer;
