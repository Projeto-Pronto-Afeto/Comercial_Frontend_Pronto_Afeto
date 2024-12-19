import { formatDate } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";
import {
  TbBrandBackbone,
  TbLayoutSidebarRight,
  TbMapPin,
} from "react-icons/tb";
import ContractDetailsSheet from "../../sheet/ContractDetailsSheet";

const ContractCard = ({ contrato }: { contrato: Contrato }) => {
 
  const contractNumber = `#CTR${contrato.cliente.nome.slice(0, 3)}-${
    contrato.id
  }`;

  
  return (
    <div className="bg-[#faf9f8e0]  rounded-3xl">
      <div className="flex justify-between px-6 py-4">
        <div className="flex gap-4">
          <div
            className={`rounded-full h-12 w-12 flex items-center justify-center ${
              contrato.status === "ASSINADO" ? "bg-green-500" : "bg-purple"
            }`}
          >
            <TbBrandBackbone className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="font-semibold flex ">
              Contrato <span className="uppercase">{contractNumber}</span>{" "}
              <ContractDetailsSheet contractId={contrato.id} />
            </h2>
            <p className="flex gap-1 text-sm text-dark-600">
              <TbMapPin className="text-dark-500 my-auto" />{" "}
              {contrato.enderecoPrestacao.bairro} ,{" "}
              {contrato.enderecoPrestacao.cidade}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`text-sm font-bold  text-end  ${
              contrato.status === "ASSINADO" ? "text-green-500" : "text-purple"
            }`}
          >
            R$ {contrato.valor.toFixed(0.2)}
          </p>
        </div>
      </div>
      <div className="border-[0.1rem] border-dark-700/20 my-4 w-full"></div>
      <div className="flex justify-between px-6 py-4">
        <div>
          <h3 className="font-semibold text-sm text-dark-500">Cliente</h3>
          <p className="text-xs text-dark-600">{contrato.cliente.nome}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-dark-500">Período</h3>
          <p className="text-xs text-dark-600 capitalize  ">
            {format(
              contrato.periodo
                .map((dateArray) => formatDate(dateArray))
                .join(", "),
              "dd 'de' MMM , yyyy",
              {
                locale: ptBR,
              }
            )}{" "}
            até{" "}
            {format(
              contrato.periodo
                .map((dateArray) => addDays(formatDate(dateArray), 30))
                .join(", "),
              "dd 'de' MMM , yyyy",
              {
                locale: ptBR,
              }
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;
