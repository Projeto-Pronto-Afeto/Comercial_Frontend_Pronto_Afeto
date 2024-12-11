import React from "react";

const GridCustomField = ({
  children,
  field,
  description,
}: {
  children: React.ReactNode;
  field: any;
  description: string;
}) => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-8">
      <div className="sm:mb-2 space-y-1">
        <h2 className="font-semibold text-sm ">{field}</h2>
        <p className="text-xs text-black/60">{description}</p>
      </div>

      {/* NAME */}

      {children}
    </div>
  );
};

export default GridCustomField;
