import LoginForm from "@/components/main/form/LoginForm";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="max-h-screen flex h-screen justify-end bg-[#ebebeb] w-full p-4 ">
      <div>
        <Image
          src={"/assets/images/shapes-img.png"}
          width={1000}
          height={1000}
          className="w-fit hidden md:block"
          alt=""
        />
      </div>
      <div className=" px-16 bg-white p-10  rounded-2xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
