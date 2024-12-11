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
import { arrayToDate } from "@/lib/utils";
import { getProposalById } from "@/actions/prposta/proposta.actions";

const ProposalDetailsSheet = async ({ proposalId }: { proposalId: number }) => {
  const proposal: Contrato = await getProposalById(1);
  console.log(proposal);
  return (
    proposal && (
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
              {/* <div className="text-purple-700 text-center bg-purple-50  rounded-lg py-2 px-4 ">
                <span className="font-semibold">Set</span>
                <p className="text-32-bold font-sans">28</p>
              </div> */}
              <div className="my-auto">
                <p className="text-black/60 text-sm">Solicitado por</p>
                <SheetTitle className="text-3xl">
                  {proposal.cliente.nome}
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>
          {/* Proposal Information */}
          <div className=" py-6">
            <div className="flex gap-6">
              <div className="grid grid-rows-6 gap-6">
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbLoader className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Status
                </p>
                <p className=" flex text-sm text-black/50 font-semibold my-auto">
                  <TbCalendarSmile className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Data
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
                  <TbAdjustmentsDollar className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Valor
                </p>
                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbMapPinFilled className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Local
                </p>
              </div>
              <div className="grid grid-rows-6 gap-6">
                <StatusBadge status={proposal.statusProposta} />
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
                <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-4">
                  {proposal.plantao.diasDaSemana.map((dia, index) => (
                    <p key={dia} className="text-sm font-medium">
                      {dia}
                      {index < proposal.plantao.diasDaSemana.length - 1 && ","}
                    </p>
                  ))}
                </p>
                <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-3">
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
                </p>

                <p
                  className="flex gap-1 text-sm font-medium px-4 my-auto
              "
                >
                  R$ 00
                </p>

                <p className="text-xs my-auto font-medium px-4">
                  {proposal.localAtendimento.rua},{" "}
                  {proposal.localAtendimento.numero} ,{" "}
                  {proposal.localAtendimento.bairro}
                </p>
              </div>
            </div>
            <div className="pt-8 ">
              <h4 className="flex gap-2 font-semibold text-lg">Observações</h4>
              {/* Essa observção virá predefinida, se tiver alimentação fornecida, a observação explicará */}
              <p className="text-sm text-black/80 py-1">
                {proposal.plantao.observacoes && proposal.plantao.observacoes}
              </p>
            </div>
          </div>
          <Tabs defaultValue="cuidado">
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
            <TabsContent value="cuidadores">Cuidadores</TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    )
  );
};

export default ProposalDetailsSheet;
