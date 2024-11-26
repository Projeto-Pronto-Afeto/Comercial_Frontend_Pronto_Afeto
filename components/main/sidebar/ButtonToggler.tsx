import React from "react";
import { LuChevronLeft } from "react-icons/lu";

export const ButtonToggler = ({
  context,
  setContext,
}: {
  context: boolean;
  setContext: (value: boolean) => void;
}) => {
  return (
    <div
      onClick={() => setContext(!context)}
      className="absolute top-[5%] right-[-12px] bg-dark-300 rounded-lg h-6 w-6 flex items-center justify-center text-white border-white hover:border-primary-600 hover:text-primary-500 border-2 z-50"
      style={{ cursor: "pointer" }}
    >
      <LuChevronLeft
        className={`transition-all duration-300 ${!context && "rotate-180"}`}
      />
    </div>
  );
};
