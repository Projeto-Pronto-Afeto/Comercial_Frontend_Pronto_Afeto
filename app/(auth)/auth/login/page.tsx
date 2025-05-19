import LoginForm from "@/components/main/form/LoginForm";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

const Login = () => {
 
  return (
    <div className="relative max-h-screen flex h-screen justify-end items-center  w-full p-4 ">
      <Image
        src={"/assets/images/bg-gradient.jpg"}
        fill
        className="w-fit   "
        alt=""
      />

      <div className="z-50 px-24 bg-white p-10  rounded-2xl h-full flex items-center  text-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
