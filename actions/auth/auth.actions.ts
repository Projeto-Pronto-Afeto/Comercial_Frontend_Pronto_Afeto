"use server";
import { insertUserToCookies } from "@/helpers/insertUserToCookies";
import { loginSchema } from "@/lib/validation";
import jwt from "jsonwebtoken";

export async function fetchPerfilComercial(
  userId: number
): Promise<PerfilComercial | null> {
  //mudar endpoint
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/clientes/v1/comercial-user/${userId}`
  );
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ data resok:", data);
    return data;
  }
  const data = await res.json();
  console.log("🚀 ~ data :", data);
  return null;
}

export type State = {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  message?: string | null;
  error?: boolean;
};

export async function login(
  previousState: State,
  formData: FormData
): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = loginSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    console.log("deu error", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Há campos a serem preenchidos corretamente. Erro ao criar documento",
      error: true,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await response.json();
  console.log("🚀 ~ data:", data);
  if (!response.ok) {
    return {
      errors: {},
      message: data.message.toString(),
      error: true,
    };
  }
  const decodedToken = jwt.decode(data.accessToken);
  const userId = (decodedToken as jwt.JwtPayload)?.user_id;
  console.log("🚀 ~ userId:", userId);
  const perfil = await fetchPerfilComercial(userId);
  console.log("🚀 ~ Comercial:", perfil);

  insertUserToCookies(data, perfil);

  return {
    errors: {},
    message: "Login efetuado com sucesso",
    error: false,
  };
}
