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

export function formatDate(dateArray: number[]): string {
  const [year, month, day] = dateArray;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}