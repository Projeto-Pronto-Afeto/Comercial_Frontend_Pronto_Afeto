'use client'
import React, { useState } from "react";
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
  TbClipboardText,
} from "react-icons/tb";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Badge } from "./ui/badge";
import { StatusBadge } from "./BadgesStatus";
import ResumeCardCuidado from "./ResumeCardCuidado";
import { arrayToComplexDate, arrayToDate, arrayToDateHour } from "@/lib/utils";
import { getProposalById } from "@/actions/prposta/proposta.actions";
import CuidadorCard from "./CuidadorCard";
import { Textarea } from "./ui/textarea";
import { diasDaSemanaMap } from "@/constants";
import { DialogTitle } from "@radix-ui/react-dialog";


const ProposalDetailsSheet = ({ proposalId }: { proposalId: number }) => {
  const [open, setOpen] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null >(null);

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !proposal) {
      const data = await getProposalById(proposalId); // precisa funcionar no client
      setProposal(data);
    }
  };
  console.log("ProposalDetailsSheet", proposal);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger>
          <TbDots className="text-black/60 text-lg" />
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className=" bg-[#faf9f8]  border-none rounded-xl overflow-y-auto simple-scrollbar"
        >
          {proposal && (  
            <div>
  <SheetHeader>
            <div className="flex gap-4">
              <div className="my-auto">
               
                <SheetDescription className="text-sm text-black/60">
                  Solicitada por
                </SheetDescription>
                <SheetTitle className="text-3xl">
                  {proposal.cliente.nome}
                </SheetTitle>
                
              </div>
            </div>
          </SheetHeader>
         
          <div className=" py-6">
            <div className="flex gap-6">
              <div className="grid grid-rows-5 gap-6">
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbLoader className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Status
                </p>
                <p className=" flex text-sm text-black/50 font-semibold my-auto">
                  <TbCalendarSmile className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Início
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbBrandDaysCounter className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Dias
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbCloud className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Turno
                </p>

                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbMapPinFilled className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Local
                </p>
              </div>
              <div className="grid grid-rows-5 gap-6">
                <StatusBadge status={proposal.statusProposta} />
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {" "}
                  {format(
                    arrayToDateHour(proposal.plantao.dataHoraInicioPlantao),
                    "dd 'de' MMMM 'de' yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                  <TbChevronRight className="text-black/40 text-lg my-[0.6px]" />
                  {format(
                    addDays(
                      arrayToDateHour(proposal.plantao.dataHoraInicioPlantao),
                      30
                    ),
                    "MMM dd, yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                </p>
                <div className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-4">
                  {proposal.plantao.diasDaSemana.map((dia, index) => (
                    <p key={dia} className="text-sm font-medium">
                      {diasDaSemanaMap[dia as keyof typeof diasDaSemanaMap] ||
                        dia}
                      {index < proposal.plantao.diasDaSemana.length - 1 && ", "}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
                  {proposal.plantao.turno.map((turn: any) => (
                    <Badge
                      key={turn}
                      className={`rounded-2xl font-light ${
                        turn === "Diurno"
                          ? "bg-yellow-50 text-yellow-500"
                          : turn === "Noturno"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-purple-50 text-purple-500"
                      }`}
                    >
                      {turn}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs my-auto font-medium px-4">
                  {proposal.localAtendimento.rua},{" "}
                  {proposal.localAtendimento.numero} ,{" "}
                  {proposal.localAtendimento.bairro}
                </p>
              </div>
            </div>
            <div className="pt-8 ">
              <p className="flex text-sm text-black/50 font-semibold mb-3">
                <TbClipboardText className=" text-black/60 my-auto mr-1 text-[18px]" />
                Observações
              </p>
              {/* Essa observção virá predefinida, se tiver alimentação fornecida, a observação explicará */}
              <Textarea
                disabled
                className="text-sm text-black/80 rounded-2xl bg-[#faf9f8]"
                value={
                  proposal.plantao.observacoes && proposal.plantao.observacoes
                }
              ></Textarea>
            </div>
          </div>
          <Tabs defaultValue="cuidadoecliente">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cuidadoecliente">
                Cuidado e Cliente
              </TabsTrigger>
              <TabsTrigger value="cuidadores">Cuidadores</TabsTrigger>
            </TabsList>
            <TabsContent value="cuidadoecliente">
              <div className="p-4">
                <ResumeCardCuidado
                  saude={proposal.saude}
                  cuidado={proposal.cuidado}
                  cliente={proposal.cliente}
                />
              </div>
            </TabsContent>
            <TabsContent value="cuidadores">
              <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
                {proposal.cuidadores.map((cuidador: Caregiver) => (
                  <CuidadorCard
                    caregiver={cuidador}
                    key={cuidador.cuidadorId}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
            </div>
            
          )
}
        
        </SheetContent>
      </Sheet>
    )
  
};

export default ProposalDetailsSheet;
