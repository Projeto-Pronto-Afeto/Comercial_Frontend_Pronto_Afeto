

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
import { format } from "date-fns";
import { formatDate } from "@/lib/utils";
import { ptBR } from "date-fns/locale";

const ResumeCardCuidado = ({
  cliente,
  cuidado,
  saude,
}: {
  cliente: Client;
  cuidado: Cuidado;
  saude?: Health;
}) => {
  return (
    <div className="col-span-1 ">
      {/* Cuidado Nome, idade, foto, resumo, pdf */}
      <div className="flex md:flex-row flex-col  gap-6 border-b-[0.125rem] border-slate-50 pb-6 mr-8">
        <div className="flex gap-6 text-start my-auto">
         
          <div>
            <h2 className="font-semibold ">{cuidado.nome}</h2>

            <p className="text-black/30 font-semibold text-sm capitalize">
              {" "}
              {format(formatDate(cuidado.dataNascimento), "MMM dd, yyyy", {
                locale: ptBR,
              })}
            </p>

            {saude && (
              <div className="pt-6">
                <p className="text-xs text-black/40">{saude.comentarios}</p>
              </div>
            )}
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
      {saude && (
        <>
          <div className=" border-b-[0.125rem] border-slate-50 mr-8 pt-6">
            <div className="flex gap-2 my-auto  text-[#959aa8]">
              <div className="p-2  rounded-lg border-[0.1rem] ">
                <TbStethoscope className="text-lg" />
              </div>

              <p className="my-auto text-sm ">Patologias</p>
            </div>
            <div className="flex gap-3 py-6">
              {saude.patologias.map((patologia) => (
                <Badge variant={"primary"}>{patologia.nome}</Badge>
              ))}
            </div>
          </div>
          <div className=" border-b-[0.125rem] border-slate-50 mr-8 pt-6">
            <div className="flex gap-2 my-auto  text-[#959aa8]">
              <div className="p-2  rounded-lg border-[0.1rem] ">
                <TbJacket className="text-lg" />
              </div>

              <p className="my-auto text-sm ">Dispositivos</p>
            </div>
            <div className="flex gap-3 py-6">
              {saude.dispositivos.map((dispositivo) => (
                <Badge variant={"primary"}>{dispositivo.nome}</Badge>
              ))}
            </div>
          </div>
        </>
      )}

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
              {cliente.nome}
            </p>
          </div>
          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">Telefone</p>
            <p className="font-semibold text-xs text-purple-600">
              {cliente.telefone}
            </p>
          </div>

          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">CPF</p>
            <p className="font-semibold text-xs text-purple-600">
              {cliente.cpf}
            </p>
          </div>

          <div className="flex py-4">
            <p className="text-xs font-medium flex-1 text-black/40">RG</p>
            <p className="font-semibold text-xs text-purple-600">
              {cliente.rg}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCardCuidado;
