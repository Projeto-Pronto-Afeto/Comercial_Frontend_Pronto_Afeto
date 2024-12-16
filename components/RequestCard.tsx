import Image from "next/image";

import React from "react";

import {
  TbBrandSuperhuman,
  TbCalendarSmile,
  TbCarambola,
  TbCheck,
  TbChevronRight,
  TbPhoneCall,
  TbUserCheck,
} from "react-icons/tb";

import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ProposalDetailsSheet from "./ProposalDetailsSheet";
import { StatusBadge } from "./BadgesStatus";
import { arrayToDate, formatDate } from "@/lib/utils";
import { acceptProposal } from "@/actions/prposta/proposta.actions";
import AcceptDialog from "./main/dialog/AcceptDialog";

interface RequestCardProps {
  proposal: MinimalProposal;
}

const RequestCard: React.FC<RequestCardProps> = ({ proposal }) => {
  const proposalNumber = `#PR${proposal.nomeCliente.slice(0, 3)}-${
    proposal.id
  }`;
  return (
    <div className="shadow-sm bg-[#faf9f8e0]   w-full py-6 px-6 rounded-xl hover:bg-appointments   ">
      <div className="">
        {/* Top */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 text-xs text-black/60">
            <span className="capitalize">
              Solicitado{" "}
              {format(formatDate(proposal.dataProposta), "MMM dd, yyyy", {
                locale: ptBR,
              })}{" "}
            </span>
          </div>
          <div className="flex justify-between border-b-[0.1rem] border-slate-100 pb-3">
            <div className="flex gap-2">
              <div className=" rounded-xl bg-purple h-10 w-10 flex justify-center items-center  font-bold">
                <TbBrandSuperhuman className="text-white text-2xl" />
              </div>

              <div className="flex gap-6 my-auto">
                <h2 className="font-semibold text-xl my-auto ">
                  Proposta <span className="uppercase">{proposalNumber}</span>
                </h2>
                <StatusBadge status={proposal.statusProposta} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {proposal && <ProposalDetailsSheet proposalId={proposal.id} />}

              {proposal.statusProposta != "Aprovada" ? (
                <AcceptDialog proposalId={proposal.id} />
              ) : (
                <></>
              )}
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
                  <TbPhoneCall className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Telefone
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbUserCheck className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Cliente
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbCarambola className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Cuidado
                </p>
              </div>
              <div className="grid grid-rows-4 gap-4">
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {" "}
                  {format(
                    formatDate(proposal.dataInicioPlantao),
                    "MMM dd, yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                  <TbChevronRight className="text-black/40 text-lg my-[0.6px]" />
                  {format(
                    addDays(formatDate(proposal.dataInicioPlantao), 30),
                    "MMM dd, yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {proposal.telefone}
                </p>

                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {proposal.nomeCliente}
                </p>
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {proposal.nomeCuidado}
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
