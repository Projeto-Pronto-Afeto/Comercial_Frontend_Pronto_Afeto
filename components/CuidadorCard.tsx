import { formatDate, truncateText } from "../lib/utils";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import {
  TbBookmark,
  TbBookmarkPlus,
  TbBookmarksFilled,
  TbBuilding,
  TbExposure,
  TbHeartBroken,
  TbHeartFilled,
  TbHelpSquare,
  TbHelpSquareRounded,
} from "react-icons/tb";
import { StatusBadge } from "./BadgesStatus";
import CuidadorDetailsSheet from "./CuidadorDetailsSheet";
import { escolaridadeLabels } from "@/constants";
import { Badge } from "./ui/badge";
import { MdOutlineBusinessCenter } from "react-icons/md";

import ButtonSetStatusCaregiver from "./main/buttons.tsx/ButtonSetStatusCaregiver";
interface CuidadorCardProps {
  caregiver: Caregiver;
}

const CuidadorCard: React.FC<CuidadorCardProps> = ({ caregiver }) => {
  // Função para classificar o tempo de experiência
  const classificarTempoExperiencia = (anos: number): string => {
    if (anos >= 0 && anos <= 2) {
      return "Iniciante";
    } else if (anos >= 3 && anos <= 6) {
      return "Amador";
    } else if (anos >= 7) {
      return "Experiente";
    } else {
      return "Desconhecido";
    }
  };

  let badgeStatus: Status;
  if (caregiver.statusCuidador === "Aprovada") {
    badgeStatus = "Aprovada";
  } else if (caregiver.statusCuidador === "Negada") {
    badgeStatus = "Negada";
  } else {
    badgeStatus = "Em_Observacao";
  }

  return (
    <div className="text-start relative  w-full  shadow-sm bg-[#faf9f8e0]    p-6 rounded-2xl hover:bg-appointments  ">
      <div className="absolute flex flex-col gap-5 top-6 right-6 text-2xl z-50">
        <ButtonSetStatusCaregiver
          id={caregiver.id}
          children={
            <TbBookmarkPlus className="cursor-pointer hover:text-purple" />
          }
          status="Aprovado"
        />
        <ButtonSetStatusCaregiver
          id={caregiver.id}
          children={
            <TbHeartBroken className="cursor-pointer hover:text-red-500" />
          }
          status="Negado"
        />
      </div>
      <div className="flex gap-4">
        <Image
          src={caregiver.fotoUrl}
          alt=""
          height={1000}
          width={1000}
          className="rounded-3xl h-20 w-20"
        />

        <div className=" p-1">
          <h4 className="text-sm font-semibold">{caregiver.nome}</h4>
          <p className="font-bold text-lg">{caregiver.titulacao}</p>
          <span className="text-xs font-medium text-dark-600">
            {caregiver.endereco.bairro}, {caregiver.endereco.cidade}
          </span>
        </div>
      </div>
      <div className="flex gap-4 py-4 overflow-x-scroll remove-scrollbar">
        <Badge
          variant={"primary"}
          className="bg-white px-3 py-1 rounded-3xl text-black font-semibold text-xs"
        >
          {classificarTempoExperiencia(caregiver.tempoExperiencia)}
        </Badge>
        <Badge
          variant={"primary"}
          className="bg-white px-3 py-1 rounded-3xl text-black font-semibold text-xs"
        >
          {
            escolaridadeLabels[
              caregiver.escolaridade as keyof typeof escolaridadeLabels
            ]
          }
        </Badge>
        <Badge
          variant={"primary"}
          className="bg-white px-3 py-1 rounded-3xl text-black font-semibold text-xs"
        >
          <StatusBadge status={caregiver.statusCuidador} />
        </Badge>
        <CuidadorDetailsSheet
          cuidador={caregiver}
          children={
            <Badge
              variant={"primary"}
              className="cursor-pointer px-3 py-1 rounded-3xl text-white bg-black hover:bg-slate-800 font-semibold text-xs"
            >
              Mais
            </Badge>
          }
        />
      </div>
      <div className="text-start px-1">
        <p className="text-xs text-dark-600">
          {truncateText(caregiver.apresentacao, 100)}
        </p>
      </div>
    </div>
  );
};

export default CuidadorCard;
