import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdClock } from "react-icons/io";
import { LuMoreVertical } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";

import {
  TbAlignBoxLeftTopFilled,
  TbCalendarSmile,
  TbCheck,
  TbChevronRight,
  TbDots,
  TbEyeHeart,
  TbLoader,
  TbMap,
  TbMapPinFilled,
  TbUserCheck,
} from "react-icons/tb";

import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ProposalDetailsSheet from "./ProposalDetailsSheet";
import { StatusBadge } from "./BadgesStatus";
import { arrayToDate } from "@/lib/utils";

interface RequestCardProps {
  proposal: Contrato;
}

const RequestCard: React.FC<RequestCardProps> = ({ proposal }) => {
  return (
    <div className="shadow-sm   w-full py-6 px-6 rounded-xl hover:bg-appointments   ">
      <div className="">
        {/* Top */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 text-xs text-black/60">
            <span className="">Solicitado às 8h, Nov 4 </span>
          </div>
          <div className="flex justify-between border-b-[0.1rem] border-slate-100 pb-3">
            <div className="flex gap-2">
              <div className=" rounded-xl h-10 w-10 flex justify-center items-center  font-bold">
                <Image
                  src={"/assets/icons/abstract-shape.png"}
                  alt=""
                  height={100}
                  width={100}
                />
              </div>
              <h2 className="font-semibold text-xl my-auto">Proposta 090</h2>
            </div>
            <div className="flex flex-col gap-4">
              <ProposalDetailsSheet proposal={proposal} />
              <div className="flex gap-1 text-xs text-green-700 ">
                <TbCheck className="text-lg" />
                <p className=""> Aceitar</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4">
              <div className="grid grid-rows-4 gap-4">
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbCalendarSmile className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Data
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbLoader className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Status
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbUserCheck className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Cliente
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbMapPinFilled className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Local
                </p>
              </div>
              <div className="grid grid-rows-4 gap-4">
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {" "}
                  {format(
                    arrayToDate(
                      proposal.dataDeInicio.map((item) => item.toString())
                    ),
                    "dd 'de' MMMM 'de' yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                  <TbChevronRight className="text-black/40 text-lg my-[0.6px]" />
                  {format(
                    addDays(
                      arrayToDate(
                        proposal.dataDeInicio.map((item) => item.toString())
                      ),
                      30
                    ),
                    "MMM dd, yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
                <StatusBadge status={"Pendente"} />
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {proposal.cliente.nome}
                </p>
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {proposal.localAtendimento.rua},{" "}
                  {proposal.localAtendimento.numero} ,{" "}
                  {proposal.localAtendimento.bairro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
