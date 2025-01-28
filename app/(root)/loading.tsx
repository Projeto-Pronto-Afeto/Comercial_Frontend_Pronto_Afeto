import React from "react";
import { TbLoader2 } from "react-icons/tb";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <TbLoader2 className="animate-spin text-4xl text-purple" />
    </div>
  );
};

export default LoadingPage;
