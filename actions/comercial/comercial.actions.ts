"use server";

import { getUserFromCookies } from "@/helpers/getUserFromToken";
import { createUserSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";

export async function getAllComerciais({
  page = 0,
  limit = 12,
}: {
  page?: number;
  limit?: number;
}): Promise<any> {
  const user = await getUserFromCookies();

  if (!user) throw new Error("User not found");
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1`);
  const params = new URLSearchParams();

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  url.search = params.toString();

  try {
    const response = await fetch(url.toString(), {
      next: { tags: ["comerciais"], revalidate: 100 },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch comerciais:", error);
    throw error; // Re-throw the error after logging it
  }
}

export type State = {
  errors: {
    nome?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
    telefone?: string[] | undefined;
    image?: string[] | undefined;
  };
  message?: string | null;
  error?: boolean;
};

export const createComercialUser = async (
  previousState: State,
  formData: FormData
): Promise<State> => {
  const user = await getUserFromCookies();

  if (!user) throw new Error("User not found");

  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const telefone = formData.get("telefone") as string;
  const image = formData.get("image"); // Verificar se está vindo como File ou Blob

  const comercial = {
    nome: nome,
    telefone: telefone,
    userDto: {
      email: email,
      password: password,
    },
  };

  formData.delete("nome");
  formData.delete("email");
  formData.delete("password");
  formData.delete("telefone");
  formData.append(
    "comercial",
    new Blob([JSON.stringify(comercial)], { type: "application/json" })
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        method: "POST",
        body: formData, // Cabeçalho gerado automaticamente
      }
    );
    if (!response.ok) {
      const error = await response.json();

      return {
        errors: {},
        message: error.message || error.toString(),
        error: true,
      };
    }

    revalidateTag("comerciais");
    return {
      errors: {},
      message: "Usuário criado com sucesso",
      error: false,
    };
  } catch (error: any) {
    console.error("Failed to fetch proposta:", error);
    return {
      errors: {},
      message: error.message || error.toString(),
      error: true,
    };
  }
};

//Function for remove comercial users

export type StateRemove = {
  errors: {
    id?: string[] | undefined;
  };
  message?: string | null;
  error?: boolean;
};
export const removeUser = async (
  previousState: StateRemove,
  formData: FormData
): Promise<StateRemove> => {
  const user = await getUserFromCookies();

  if (!user) throw new Error("User not found");
  const id = formData.get("id") as string;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        method: "DELETE",
      }
    );
    if (!response.ok) {
      return {
        errors: {},
        message: "Erro ao deletar usuário",
        error: true,
      };
    }

    revalidateTag("comerciais");
    return {
      errors: {},
      message: "Usuário removido com sucesso",
      error: false,
    };
  } catch (error) {
    console.error("Failed to fetch proposta:", error);
    throw error; // Re-throw the error after logging it
  }
};
