'use client';

import { formatDate } from "../lib/utils";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { format } from "date-fns";
import { TbCalendarSmile, TbBuilding, TbNotebook, TbCarambola, TbX, TbCheck } from "react-icons/tb";
import { StatusBadge } from "./BadgesStatus";
import CuidadorDetailsSheet from "./CuidadorDetailsSheet";

interface CuidadorCardProps {
  caregiver:Caregiver;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const CuidadorCard : React.FC<CuidadorCardProps> = ({ caregiver, onApprove, onReject }) => {
  const handleApprove = () => {
    onApprove(caregiver.cuidadorId);
  };

  const handleReject = () => {
    onReject(caregiver.cuidadorId);
  };
  let badgeStatus:Status;
  if(caregiver.statusCuidador === 'Aprovado'){
    badgeStatus = 'Assinado';
  } else if (caregiver.statusCuidador === 'Negado'){
    badgeStatus = 'Rejeitado';
  } else {
    badgeStatus = 'Pendente';
  }
  
  return (
    <div className="shadow-sm   w-full py-6 px-6 rounded-xl hover:bg-appointments   ">
      <div className="">
        {/* Top */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between border-b-[0.1rem] border-slate-100 pb-3">
            <div className="flex gap-2">
              <div className=" rounded-xl h-10 w-10 flex justify-center items-center  font-bold">
                <Image
                  src={caregiver.fotoUrl}
                  alt=""
                  height={100}
                  width={100}
                />
              </div>

              <div className="flex gap-6 my-auto">
                <h2 className="font-semibold text-xl my-auto">{caregiver.nome}</h2>
                {}
                <StatusBadge status={badgeStatus} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <CuidadorDetailsSheet cuidador={caregiver} />
              <div className="flex gap-1 text-xs text-green-700 cursor-pointer " onClick={handleApprove}>
                <TbCheck className="text-lg" />
                <p>Aprovar</p>
              </div>
              <div className="flex gap-1 text-xs text-red-700 cursor-pointer " onClick={handleReject}>
                <TbX className="text-lg" />
                <p>Rejeitar</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4">
              <div className="grid grid-rows-4 gap-4">
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbCalendarSmile className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Data de Nascimento
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbBuilding className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Cidade
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbNotebook className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Escolaridade
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbCarambola className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Tempo de Experiência
                </p>
              </div>
              <div className="grid grid-rows-4 gap-4">
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {" "}
                  {format(formatDate(caregiver.dataNascimento), "MMM dd, yyyy", {
                    locale: ptBR,
                  })}
                </p>
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {caregiver.endereco.cidade}
                </p>
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {caregiver.escolaridade}
                </p>
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {caregiver.tempoExperiencia} anos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuidadorCard;