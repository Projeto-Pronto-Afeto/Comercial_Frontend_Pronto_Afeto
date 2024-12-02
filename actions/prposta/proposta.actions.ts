"use server";

import { acceptProposalSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";

export async function getAllPropostas(): Promise<ProposalDTOGet> {
  try {
    const response = await fetch(
      "http://localhost:8080/api/propostas/v1/orderByDateAndGroupByStatus",
      { next: { tags: ["solicitacoes"] } }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log("🚀 ~ data", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch propostas:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function getProposalById(id: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/propostas/v1/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log("🚀 ~ data", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch proposta:", error);
    throw error; // Re-throw the error after logging it
  }
}

export type State = {
  errors: {
    observacao?: string[] | undefined;
    valor?: string[] | undefined;
  };
  message?: string | null;
  error?: boolean;
};

export async function acceptProposal(
  previousState: State,
  formData: FormData
): Promise<State> {
  const id = formData.get("id");

  const observacoes = formData.get("observacoes") as string;
  const valor = formData.get("valor") as string;

  const validatedFields = acceptProposalSchema.safeParse({
    observacoes: observacoes,
    valor: valor,
  });

  if (!validatedFields.success) {
    console.log("deu error", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Há campos a serem preenchidos corretamente.",
      error: true,
    };
  }

  const data = {
    observacaoFinanceiro: observacoes,
    valor: valor,
  };

  try {
    const response = await fetch(
      `http://localhost:8080/api/propostas/v1/aprovar/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log("🚀 ~ response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    revalidateTag("solicitacoes");
    return {
      errors: {},
      message: "Proposta aceita com sucesso",
      error: false,
    };
  } catch (error) {
    console.error("Failed to accept proposta:", error);
    return {
      errors: {},
      message: "Ocorreu um erro ao aceitar a proposta",
      error: true,
    }; // Re-throw the error after logging it
  }
}
