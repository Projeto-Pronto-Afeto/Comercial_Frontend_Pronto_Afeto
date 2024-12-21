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
  TbClipboardText,
  TbBrandBackbone,
  TbLayoutSidebarRight,
} from "react-icons/tb";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { formatDate } from "@/lib/utils";

import { getContractById } from "@/actions/contrato/contrato.actions";

import ResumeCardCuidado from "@/components/ResumeCardCuidado";

import CuidadorCard from "@/components/CuidadorCard";
import { ContractStatus } from "@/components/ContractStatus";

const ContractDetailsSheet = async ({ contractId }: { contractId: number }) => {
  const contrato: Contrato = await getContractById(contractId);

  return (
    contrato && (
      <Sheet>
        <SheetTrigger>
          <TbLayoutSidebarRight className="text-dark-500 my-auto text-lg ml-4" />{" "}
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className=" bg-[#faf9f8]  border-none rounded-xl overflow-y-auto simple-scrollbar"
        >
          <SheetHeader>
            <div className="flex gap-4">
              <div className="my-auto">
                <p className="text-black/60 text-sm">Solicitado por</p>
                <SheetTitle className="text-3xl">
                  {contrato.cliente.nome}
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>
          {/* contrato Information */}
          <div className=" py-6">
            <div className="flex gap-6">
              <div className="grid grid-rows-5 gap-6">
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
                  Horários
                </p>

                <p className="flex text-sm text-black/50 font-semibold my-auto">
                  <TbMapPinFilled className=" text-black/60 my-auto mr-1 text-[18px]" />
                  Local
                </p>
              </div>
              <div className="grid grid-rows-5 gap-6">
                <ContractStatus status={contrato.status} />
                <p className="text-sm gap-2 flex text-black font-medium px-4 capitalize my-auto">
                  {" "}
                  {format(
                    contrato.periodo
                      .map((dateArray) => formatDate(dateArray))
                      .join(", "),
                    "dd 'de' MMM , yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
                  <TbChevronRight className="text-black/40 text-lg my-[0.6px]" />
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
                <p className="flex gap-2 my-auto overflow-hidden remove-scrollbar px-4">
                  {contrato.horarios.map((horario, index) => (
                    <p key={index} className="text-sm font-medium">
                      {horario} h {"  "}
                    </p>
                  ))}
                </p>

                <p className="text-xs my-auto font-medium px-4">
                  {contrato.enderecoPrestacao.rua},{" "}
                  {contrato.enderecoPrestacao.numero} ,{" "}
                  {contrato.enderecoPrestacao.bairro}
                </p>
              </div>
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
                  cuidado={contrato.cuidado}
                  cliente={contrato.cliente}
                />
              </div>
            </TabsContent>
            <TabsContent value="cuidadores">
              <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
                {contrato.cuidadores.map((cuidador: Caregiver) => (
                  <CuidadorCard
                    caregiver={cuidador}
                    key={cuidador.cuidadorId}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    )
  );
};

export default ContractDetailsSheet;
