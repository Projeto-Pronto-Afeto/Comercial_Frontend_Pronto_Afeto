import React from "react";
import { Badge } from "@/components/ui/badge";


const CardExperience = ({ caregiver }: { caregiver: Caregiver }) => {
  let badgeStatus: Status;
  if (caregiver.statusCuidador === "Aprovado") {
    badgeStatus = "Aprovada";
  } else if (caregiver.statusCuidador === "Negado") {
    badgeStatus = "Negada";
  } else {
    badgeStatus = "Em_Observacao";
  }
  return (
    <div className="bg-[#faf9f8e0] px-6 rounded-3xl py-8 mt-8">
      <h3 className="font-semibold text-lg">Experiências</h3>

      <div className="flex gap-4 py-4 overflow-x-scroll remove-scrollbar">
        {caregiver.experiencias.length > 0 ? (
          caregiver.experiencias.map((exp, index) => (
            <Badge
              key={index}
              variant={"primary"}
              className="bg-white px-3 py-1 rounded-3xl text-black font-semibold text-xs"
            >
              {exp.nome}
            </Badge>
          ))
        ) : (
          <p className="text-xs text-gray-500">
            Nenhuma experiência cadastrada
          </p>
        )}
      </div>

      <h3 className="font-semibold text-lg">Habilidades</h3>

      <div className="flex gap-4 py-4 overflow-x-scroll remove-scrollbar">
        {caregiver.habilidades.length > 0 ? (
          caregiver.habilidades.map((hab, index) => (
            <Badge
              key={index}
              variant={"primary"}
              className="bg-white px-3 py-1 rounded-3xl text-black font-semibold text-xs"
            >
              {hab.nome}
            </Badge>
          ))
        ) : (
          <p className="text-xs text-gray-500">Nenhuma habilidade cadastrada</p>
        )}
      </div>
    </div>
  );
};

export default CardExperience;
