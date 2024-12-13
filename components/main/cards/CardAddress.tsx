import React from "react";

const CardAddress = ({ caregiver }: { caregiver: Caregiver }) => {
  return (
    <div className="bg-[#faf9f8e0] px-6 rounded-3xl py-8 mt-8">
      <h2 className="font-semibold text-lg capitalize">Endereço</h2>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-2">
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            CEP
          </h3>
          <p className="text-xs text-dark-500">{caregiver.endereco.cep}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Estado
          </h3>
          <p className="text-xs text-dark-500">{caregiver.endereco.estado}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Cidade
          </h3>
          <p className="text-xs text-dark-500">{caregiver.endereco.cidade}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Bairro
          </h3>
          <p className="text-xs text-dark-500">{caregiver.endereco.bairro}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Rua
          </h3>
          <p className="text-xs text-dark-500">{caregiver.endereco.rua}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">RG</h3>
          <p className="text-xs text-dark-500">{caregiver.endereco.numero}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm capitalize text-dark-500">
            Complemento
          </h3>
          <p className="text-xs text-dark-500">
            {caregiver.endereco.complemento}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardAddress;
