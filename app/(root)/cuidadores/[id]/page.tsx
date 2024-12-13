import { getCuidadorById } from "@/actions/cuidador/cuidador.actions";

import LoadingPage from "@/components/LoadingPage";
import ButtonSetStatusCaregiver from "@/components/main/buttons.tsx/ButtonSetStatusCaregiver";
import CardAddress from "@/components/main/cards/CardAddress";
import CardApresentation from "@/components/main/cards/CardApresentation";
import CardExperience from "@/components/main/cards/CardExperience";
import CardOtherInformations from "@/components/main/cards/CardOtherInformations";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";
import { TbBookmarkPlus, TbHeartBroken } from "react-icons/tb";

const CaregiverDetailsPage = async ({ params }: SearchParamProps) => {
  const { id } = params;

  const caregiver = await getCuidadorById(id);
  if (!caregiver) return <LoadingPage />;

  return (
    <div className="relative">
      <div className="w-full h-40">
        <Image
          src={"/assets/images/bg-calm.jpg"}
          alt="Admin"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>

      <div className="z-50 absolute top-28  w-full px-8">
        <div className="flex gap-4">
          {" "}
          <Image
            src={caregiver.fotoUrl}
            alt=""
            height={1000}
            width={1000}
            className="rounded-3xl h-32 w-32 border-2 border-white "
          />
          <section className="flex md:flex-row flex-col gap-8 justify-between w-full mt-16">
            <div className="">
              <h4 className="font-bold text-xl">{caregiver.nome}</h4>
              <span className="text-xs font-medium text-dark-600">
                Cuidador com {caregiver.tempoExperiencia} anos de experiência em
                cuidado de pessoas e titulado como{" "}
                <span className="text-purple font-semibold">
                  {caregiver.titulacao}
                </span>
                .
              </span>
            </div>
            <div className="my-auto flex gap-4">
              {caregiver.statusCuidador === "Aprovado" ||
              caregiver.statusCuidador === "Negado" ? (
                <></>
              ) : (
                <ButtonSetStatusCaregiver
                  id={caregiver.cuidadorId}
                  children={
                    <Button type="button" variant="outline" size={"sm"}>
                      <TbHeartBroken className="text-xl" />
                      Rejeitar
                    </Button>
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
                    <Button
                      variant="default"
                      className={"bg-slate-800 hover:bg-slate-700 text-white"}
                      size={"sm"}
                    >
                      <TbBookmarkPlus className="text-xl" />
                      Aprovar
                    </Button>
                  }
                  status="Aprovado"
                />
              )}
            </div>
          </section>
        </div>
        <section className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <CardExperience caregiver={caregiver} />
          <CardOtherInformations caregiver={caregiver} />
          <CardApresentation caregiver={caregiver} />
          <CardAddress caregiver={caregiver} />
        </section>
      </div>
    </div>
  );
};

export default CaregiverDetailsPage;
