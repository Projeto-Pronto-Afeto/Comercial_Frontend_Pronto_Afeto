import { getAllPatologias } from "@/actions/patologias/patologias.actions";
import LoginForm from "@/components/main/form/LoginForm";
import RegisterCaregiverForm from "@/components/main/form/RegisterCaregiverForm";
import Image from "next/image";
import React from "react";

const CreateCaregiverPage = async () => {
  const patologias = await getAllPatologias();
  return (
    <div className="absolute inset-0 grid md:grid-cols-2 grid-cols-1 h-full w-full">
      <div className="relative h-full rounded-r-2xl">
        <Image
          src={"/assets/images/texture.jpg"}
          layout="fill"
          objectFit="cover"
          className="hidden md:block rounded-2xl"
          alt=""
        />
      </div>
      <div className="px-16 bg-white p-10 rounded-2xl h-full flex items-center text-center">
        <RegisterCaregiverForm patologias={patologias?.data?.content || []} />
      </div>
    </div>
  );
};

export default CreateCaregiverPage;
