import { getAllHabilidades } from "@/actions/habilidades/habilidades.actions";
import { getAllPatologias } from "@/actions/patologias/patologias.actions";

import RegisterCaregiverForm from "@/components/main/form/RegisterCaregiverForm";
import Image from "next/image";
import React from "react";

const CreateCaregiverPage = async () => {
  const patologias = await getAllPatologias();
  console.log("🚀 ~ CreateCaregiverPage ~ patologias:", patologias);
  const habilidades = await getAllHabilidades();
  return (
    <div className="absolute inset-0 grid md:grid-cols-2 grid-cols-1 h-full w-full">
      <div className="relative h-full ">
        <Image
          src={"/assets/images/bg-calm.jpg"}
          layout="fill"
          objectFit="cover"
          className="hidden md:block "
          alt=""
        />
      </div>
      <div className="px-16 bg-white p-10 rounded-2xl h-full flex items-center text-center">
        <RegisterCaregiverForm
          patologias={patologias?.data?.content || []}
          habilidades={habilidades?.data?.content || []}
        />
      </div>
    </div>
  );
};

export default CreateCaregiverPage;
