

import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import Image from "next/image";

import {
  TbJacket,
  TbStethoscope,
  TbShare3,
  TbUserSquareRounded,
} from "react-icons/tb";
import React from "react";

import { Badge } from "@/components/ui/badge";

const ResumeCardCuidado = () => {
  return (
    <div className="col-span-1 ">
      {/* Cuidado Nome, idade, foto, resumo, pdf */}
      <div className="flex md:flex-row sm:flex-col sm:items-center gap-6 border-b-[0.125rem] border-slate-50 pb-6 mr-8">
        <Image
          src={"/assets/images/woman-avatar.svg"}
          height={1000}
          width={1000}
          alt="Cuidado image"
          className="w-fit h-36 rounded-2xl"
        />
        <div className=" my-auto">
          <div className="flex justify-between">
            <h2 className="font-semibold ">Roseane Souto</h2>
            <TbGenderFemale className="text-lg text-purple-700 " />
          </div>

          <p className="text-black/30 font-semibold text-sm">
            12 Jun, 1856 (66 anos)
          </p>
          {/* <div className="flex bg-slate-100/50 p-2 mt-6 rounded-lg gap-4">
            <div className="flex gap-1 my-auto">
              <TbShare3 className="text-lg " />
              <p className=" my-auto text-xs font-semibold">Resumo</p>
            </div>
            <button className="p-2 rounded-md  bg-dark-400 flex  text-white gap-1 text-xs">
              <LuDownload className="text-sm " />
              .pdf
            </button>
          </div> */}
          <div className="pt-6">
            <p className="text-xs text-black/40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tristique, odio eget consectetur.{" "}
            </p>
          </div>
        </div>
      </div>
      {/* observações */}
      {/* <div className=" border-b-[0.125rem] border-slate-50 mr-8 py-6">
        <div className="flex gap-2 my-auto  text-[#959aa8]">
          <div className="p-2  rounded-lg border-[0.1rem] ">
            <LuInfo className="text-lg" />
          </div>

          <p className="my-auto text-sm ">Observações</p>
        </div>
        <div className="pt-6">
          <p className="text-xs text-black/40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tristique, odio eget consectetur.{" "}
          </p>
        </div>
      </div> */}
      {/* Patologias */}
      <div className=" border-b-[0.125rem] border-slate-50 mr-8 pt-6">
        <div className="flex gap-2 my-auto  text-[#959aa8]">
          <div className="p-2  rounded-lg border-[0.1rem] ">
            <TbStethoscope className="text-lg" />
          </div>

          <p className="my-auto text-sm ">Patologias</p>
        </div>
        <div className="flex gap-3 py-6">
          <Badge variant={"primary"}>Patologia 1</Badge>
          <Badge variant={"primary"}>Patologia 2</Badge>
          <Badge variant={"primary"}>Patologia 2</Badge>
        </div>
      </div>
      {/* Dispositivos */}
      <div className=" border-b-[0.125rem] border-slate-50 mr-8 pt-6">
        <div className="flex gap-2 my-auto  text-[#959aa8]">
          <div className="p-2  rounded-lg border-[0.1rem] ">
            <TbJacket className="text-lg" />
          </div>

          <p className="my-auto text-sm ">Dispositivos</p>
        </div>
        <div className="flex gap-3 py-6">
          <Badge variant={"primary"}>Patologia 1</Badge>
          <Badge variant={"primary"}>Patologia 2</Badge>
          <Badge variant={"primary"}>Patologia 2</Badge>
        </div>
      </div>
      {/* Dispositivos */}
      <div className=" mr-8 pt-6">
        <div className="flex gap-2 my-auto  text-[#959aa8]">
          <div className="p-2  rounded-lg border-[0.1rem] ">
            <TbUserSquareRounded className="text-lg" />
          </div>

          <p className="my-auto text-sm ">Cliente</p>
        </div>
        <div className="pt-6">
          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">
              Nome Completo
            </p>
            <p className="font-semibold text-xs text-purple-600">
              Lucas Oliveira Souto
            </p>
          </div>
          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">Telefone</p>
            <p className="font-semibold text-xs text-purple-600">
              71 999839209
            </p>
          </div>

          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">CPF</p>
            <p className="font-semibold text-xs text-purple-600">19832990239</p>
          </div>

          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">RG</p>
            <p className="font-semibold text-xs text-purple-600">32893289</p>
          </div>

          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">Endereço</p>
            <p className="font-semibold text-xs text-purple-600">
              Avenida Carlos Gomes, Paralela, 232
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCardCuidado;
