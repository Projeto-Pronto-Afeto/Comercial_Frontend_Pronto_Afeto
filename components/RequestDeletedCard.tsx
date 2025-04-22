import React from "react";
import {
  TbAlertTriangle,
  TbCarambola,
  TbPhoneCall,
  TbUserCheck,
} from "react-icons/tb";

interface RequestCardProps {
  proposal: MinimalProposal;
}

const RequestDeletedCard: React.FC<RequestCardProps> = ({ proposal }) => {
  const proposalNumber = `#PR${proposal.nomeCliente.slice(0, 3)}-${proposal.id}`;

  return (
    <div className="bg-[#fff3f3] border border-red-300 w-full py-6 px-6 rounded-xl relative opacity-80 hover:opacity-100 transition duration-200">
      {/* Fita superior de cancelamento */}
      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-bl-xl font-semibold">
        CANCELADA
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-2">
        {/* Data solicitada */}
        <div className="flex gap-5 text-xs text-red-500 font-semibold">
          <span className="capitalize">
            Solicitado{" "}

          </span>
        </div>

        {/* Título */}
        <div className="flex justify-between border-b border-red-200 pb-3">
          <div className="flex gap-2">
            <div className="rounded-xl bg-red-500 h-10 w-10 flex justify-center items-center">
              <TbAlertTriangle className="text-white text-2xl" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-semibold text-xl text-red-600">
                Proposta <span className="uppercase">{proposalNumber}</span>
              </h2>
              <p className="text-sm text-red-500 font-medium">
                Cancelada pelo cliente
              </p>
            </div>
          </div>
        </div>

        {/* Detalhes */}
        <div className="flex gap-4 mt-4">
          <div className="grid grid-rows-4 gap-4">

            <p className="flex text-sm text-red-400 font-semibold">
              <TbPhoneCall className="mr-1 text-[18px]" />
              Telefone
            </p>
            <p className="flex text-sm text-red-400 font-semibold">
              <TbUserCheck className="mr-1 text-[18px]" />
              Cliente
            </p>
            <p className="flex text-sm text-red-400 font-semibold">
              <TbCarambola className="mr-1 text-[18px]" />
              Cuidado
            </p>
          </div>
          <div className="grid grid-rows-4 gap-4 text-red-700">

            <p className="text-sm font-medium px-4">{proposal.telefone}</p>
            <p className="text-sm font-medium px-4">{proposal.nomeCliente}</p>
            <p className="text-sm font-medium px-4">{proposal.nomeCuidado}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDeletedCard;
