import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  TbCalendarCheck,
  TbCalendarSmile,
  TbChevronRight,
  TbDots,
  TbEdit,
  TbLoader,
  TbMapPinFilled,
  TbBrandDaysCounter,
  TbCloud,
  TbAdjustmentsDollar,
} from "react-icons/tb";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Badge } from "./ui/badge";
import { StatusBadge } from "./BadgesStatus";
import ResumeCardCuidado from "./ResumeCardCuidado";
import { arrayToDate, formatDate } from "@/lib/utils";
import { getProposalById } from "@/actions/prposta/proposta.actions";

const CuidadorDetailsSheet = ({ cuidador }: { cuidador: Caregiver }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <TbDots className="text-black/60 text-lg" />
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className=" bg-white dark:bg-dark-200 dark:text-white border-none rounded-xl overflow-y-auto "
      >
        <SheetHeader>
          <div className="flex gap-4">
            <div className="my-auto">
              <SheetTitle className="text-3xl">{cuidador.nome}</SheetTitle>
            </div>
          </div>
        </SheetHeader>
        <div className="py-6">
          <div className="flex gap-6">
            <div style={{ gridTemplateRows: 'repeat(15, minmax(0, 1fr))' }} className="grid gap-6">
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                <TbLoader className=" text-black/60 my-auto mr-1 text-[18px]" />
                Status
              </p>
              <p className=" flex text-sm text-black/50 font-semibold my-auto">
                <TbCalendarSmile className=" text-black/60 my-auto mr-1 text-[18px]" />
                Data de Nascimento
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                RG
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Pai
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Mãe
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Endereço
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Telefone
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Peso
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Altura
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Escolaridade
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Titulação
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Tempo de Experiência
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Experiências
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Habilidades
              </p>
              <p className="flex text-sm text-black/50 font-semibold my-auto">
                Apresentação
              </p>
            </div>
            <div style={{ gridTemplateRows: 'repeat(15, minmax(0, 1fr))' }} className="grid gap-6">
              <StatusBadge status="Pendente" />
              <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                {" "}
                {format(
                  formatDate(cuidador.dataNascimento
                  ),
                  "dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR,
                  }
                )}
              </p>
              <p className="flex text-sm gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.rg}
              </p>
              <p className="flex text-sm gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.nomePai}
              </p>
              <p className="flex text-sm gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.nomeMae}
              </p>
              <p className="flex text-sm gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {`${cuidador.endereco.rua}, ${cuidador.endereco.numero}, ${cuidador.endereco.bairro}
                  ,${cuidador.endereco.cidade} - ${cuidador.endereco.estado}`}
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.telefone}
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.peso}Kg
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.altura}m
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.escolaridade}
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.titulacao}
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.tempoExperiencia} anos
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.experiencias.join(', ')}
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.habilidades.join(', ')}
              </p>
              <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                {cuidador.apresentacao}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CuidadorDetailsSheet;
