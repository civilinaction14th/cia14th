import React from "react";

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h3 className="text-lg font-bold font-publicas text-[#262626] mb-2 uppercase font-bold">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormSection;
