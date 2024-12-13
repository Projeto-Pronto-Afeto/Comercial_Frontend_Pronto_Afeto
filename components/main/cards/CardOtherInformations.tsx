import { escolaridadeLabels } from "@/constants";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React from "react";

const CardOtherInformations = ({ caregiver }: { caregiver: Caregiver }) => {
  return (
    <div className="bg-[#faf9f8e0] px-6 rounded-3xl py-8 mt-8">
      <h2 className="font-semibold text-lg capitalize">Outras Informações</h2>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-2">
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Data de Nascimento
          </h3>
          <p className="text-xs text-dark-500">
            {format(
              formatDate(caregiver.dataNascimento),
              "dd 'de' MMMM 'de' yyyy",
              {
                locale: ptBR,
              }
            )}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Altura
          </h3>
          <p className="text-xs text-dark-500">{caregiver.altura}m</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Peso
          </h3>
          <p className="text-xs text-dark-500">{caregiver.peso}Kg</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Nome do Pai
          </h3>
          <p className="text-xs text-dark-500">{caregiver.nomePai}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Nome da Mãe
          </h3>
          <p className="text-xs text-dark-500">{caregiver.nomeMae}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">RG</h3>
          <p className="text-xs text-dark-500">{caregiver.rg}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Telefone
          </h3>
          <p className="text-xs text-dark-500">{caregiver.telefone}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            escolaridade
          </h3>
          <p className="text-xs text-dark-500">
            {
              escolaridadeLabels[
                caregiver.escolaridade as keyof typeof escolaridadeLabels
              ]
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardOtherInformations;
