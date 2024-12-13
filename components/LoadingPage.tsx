import React from "react";
import { TbLoader2 } from "react-icons/tb";

const LoadingPage = () => {
  return (
    <div className="flex items-center h-full justify-center">
      <TbLoader2 className="animate-spin text-purple text-5xl" />
    </div>
  );
};

export default LoadingPage;
