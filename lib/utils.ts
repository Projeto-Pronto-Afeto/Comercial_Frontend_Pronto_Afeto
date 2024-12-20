import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const arrayToDate = (dateArray: string[]): Date => {
  const [day, month, year] = dateArray;
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString);
};


export const arrayToDateHour = (dateArray: number[]) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) {
    throw new Error("Invalid date array");
  }
  const [year, month, day, hour = 0, minute = 0] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

export const arrayToComplexDate = (dateArray: number[]): Date => {
  const [year, month, day, hour, minute, second, millisecond] = dateArray;
  return new Date(year, month - 1, day, hour, minute, second, millisecond); // Lembre-se que os meses em JavaScript são baseados em zero
};
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
export const classificarTempoExperiencia = (anos: number): string => {
  if (anos >= 0 && anos <= 2) {
    return "Iniciante";
  } else if (anos >= 3 && anos <= 6) {
    return "Amador";
  } else if (anos >= 7) {
    return "Experiente";
  } else {
    return "Desconhecido";
  }
};

export function formatDate(dateArray: number[]): string {
  const [year, month, day] = dateArray;
  // Subtraia 1 do mês ao criar o objeto Date
  const date = new Date(year, month - 1, day + 1);

  // Retorne a data formatada corretamente no formato YYYY-MM-DD
  return date.toISOString().split("T")[0];
}

export const convertToOptions = (values: any) => {
  return (
    values &&
    values.map((value: any) => ({
      key: value.id,
      value: value,
    }))
  );
};

export const convertPatologiasToOptions = (patologias: Patology[]) => {
  return (
    patologias &&
    patologias.map((patologia) => ({
      key: patologia.id,
      value: patologia.nome,
    }))
  );
};

export const convertHabilitiesToOptions = (habilidades: Hability[]) => {
  return (
    habilidades &&
    habilidades.map((hability) => ({
      key: hability.id,
      value: hability.nome,
    }))
  );
};

