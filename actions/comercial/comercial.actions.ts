"use server";
import { createUserSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";

export const getAllComercialUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1`,
      {
        next: { tags: ["users-comercial"] },
      }
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
};

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
  formData.append("comercial", JSON.stringify(comercial));

  console.log("🚀 ~ formData:", formData);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1`,
      {
        method: "POST",
        body: formData, // Cabeçalho gerado automaticamente
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.log("🚀 ~ error:", error);
      return {
        errors: {},
        message: error.message || error.toString(),
        error: true,
      };
    }
    const data = await response.json();

    console.log("🚀 ~ data", data);
    revalidateTag("users-comercial");
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
  console.log("🚀 ~ formData", formData);
  const id = formData.get("id") as string;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/${id}`,
      {
        headers: {
          Accept: "application/json",
          // O cabeçalho Content-Type será definido automaticamente pelo navegador
          // quando você usa FormData, então não é necessário defini-lo manualmente.
        },
        method: "DELETE",
        next: { tags: ["users-comercial"] },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log("🚀 ~ data", data);
    revalidateTag("users-comercial");
    return data;
  } catch (error) {
    console.error("Failed to fetch proposta:", error);
    throw error; // Re-throw the error after logging it
  }
};