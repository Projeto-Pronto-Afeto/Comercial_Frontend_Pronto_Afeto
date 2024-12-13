import {
  classificarTempoExperiencia,
  formatDate,
  truncateText,
} from "../lib/utils";
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

import { escolaridadeLabels } from "@/constants";
import { Badge } from "./ui/badge";
import { MdOutlineBusinessCenter } from "react-icons/md";

import ButtonSetStatusCaregiver from "./main/buttons.tsx/ButtonSetStatusCaregiver";
import Link from "next/link";
interface CuidadorCardProps {
  caregiver: Caregiver;
}

const CuidadorCard: React.FC<CuidadorCardProps> = ({ caregiver }) => {
  console.log("Status do cuidador:", caregiver.statusCuidador);

  let badgeStatus: Status;
  if (caregiver.statusCuidador === "Aprovado") {
    badgeStatus = "Aprovada";
  } else if (caregiver.statusCuidador === "Negado") {
    badgeStatus = "Negada";
  } else {
    badgeStatus = "Em_Observacao";
  }

  return (
    <div className="text-start relative  w-full  shadow-sm bg-[#faf9f8e0]    p-6 rounded-2xl hover:bg-appointments  ">
      <div className="absolute flex flex-col gap-5 top-6 right-6 text-2xl z-50">
        {caregiver.statusCuidador === "Aprovado" ||
        caregiver.statusCuidador === "Negado" ? (
          <></>
        ) : (
          <ButtonSetStatusCaregiver
            id={caregiver.cuidadorId}
            children={
              <TbBookmarkPlus className="cursor-pointer hover:text-purple" />
            }
            status="Aprovado"
          />
        )}
        {caregiver.statusCuidador === "Aprovado" ||
        caregiver.statusCuidador === "Negado" ? (
          <></>
        ) : (
          <ButtonSetStatusCaregiver
            id={caregiver.cuidadorId}
            children={
              <TbHeartBroken className="cursor-pointer hover:text-red-500" />
            }
            status="Negado"
          />
        )}
      </div>
      <div className="flex gap-4">
        <Image
          src={caregiver.fotoUrl}
          alt=""
          height={1000}
          width={1000}
          className="rounded-3xl h-20 w-20"
        />

        <div className=" p-1 pr-8">
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
          <StatusBadge status={badgeStatus} />
        </Badge>

        <Link href={`/cuidadores/${caregiver.cuidadorId}`} className="my-auto">
          <Badge
            variant={"primary"}
            className="cursor-pointer px-3 py-1 rounded-3xl text-white bg-black hover:bg-slate-800 font-semibold text-xs"
          >
            Mais
          </Badge>
        </Link>
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
