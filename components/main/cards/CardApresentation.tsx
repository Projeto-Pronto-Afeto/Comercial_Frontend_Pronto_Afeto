import React from "react";

const CardApresentation = ({ caregiver }: { caregiver: Caregiver }) => {
  return (
    <div className="bg-[#faf9f8e0] px-6 rounded-3xl py-8 mt-8">
      <h3 className="font-semibold text-lg capitalize">
        Sobre {caregiver.nomeApresentacao}{" "}
      </h3>
      <p className="text-sm text-dark-500">
        {caregiver.apresentacao || "Nenhuma apresentação cadastrada"}
      </p>
    </div>
  );
};

export default CardApresentation;
