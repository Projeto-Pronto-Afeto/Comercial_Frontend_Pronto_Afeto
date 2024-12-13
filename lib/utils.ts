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
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}
export const convertToOptions = (values: string[]) => {
  return (
    values &&
    values.map((value, index) => ({
      key: value,
      name: value,
    }))
  );
};