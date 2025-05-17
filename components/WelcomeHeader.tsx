'use client'
import Image from "next/image";
import { useState } from "react";

interface WelcomeHeaderProps {
  nome: string;
  fotoUrl?: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ nome, fotoUrl }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex gap-4">
      {!imageError && fotoUrl ? (
        <Image
          src={fotoUrl}
          alt="Admin"
          width={120}
          height={120}
          className="rounded-full w-fit h-14 my-auto"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="rounded-full w-14 h-14 flex items-center justify-center bg-gray-300 text-white text-xl font-bold"
        >
          {getInitials(nome || "A")}
        </div>
      )}
      <div>
        <h1 className="header">Olá, {nome}</h1>
        <p className="text-dark-500 font-light mt-2">
          Acompanhe as solicitações diárias
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;