import SignUpForm from "@/components/form/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-3xl flex items-center justify-center ">
          <SignUpForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Pronto Afeto
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default SignUpPage;
