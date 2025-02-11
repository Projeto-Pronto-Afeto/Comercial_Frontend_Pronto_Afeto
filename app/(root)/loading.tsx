import React from "react";
import { TbLoader2 } from "react-icons/tb";

const LoadingPage = () => {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center items-center h-screen">
          <TbLoader2 className="animate-spin text-4xl text-purple" />
        </div>
      </body>
    </html>
  );
};

export default LoadingPage;
