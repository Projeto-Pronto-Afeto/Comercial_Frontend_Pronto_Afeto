"use server";
import { createUserSchema } from "@/lib/validation";

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
  const image = formData.get("image") as string;

  const userDto = {
    email: email,
    password: password,
  };

  formData.append("userDto", JSON.stringify(userDto));
  formData.delete("email");
  formData.delete("password");

  console.log("🚀 ~ formData", formData);

  const validatedFields = createUserSchema.safeParse({
    nome: nome,
    email: email,
    password: password,
    telefone: telefone,
    image: image,
  });

  if (!validatedFields.success) {
    console.log("deu error", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Há campos a serem preenchidos corretamente.",
      error: true,
    };
  }
  console.log(formData);

  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     }
  //   );
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json();

  //   console.log("🚀 ~ data", data);
  //   return data;
  // } catch (error) {
  //   console.error("Failed to fetch proposta:", error);
  //   throw error; // Re-throw the error after logging it
  // }
};
