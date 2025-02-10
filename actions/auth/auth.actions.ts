"use server";
import { insertUserToCookies } from "@/helpers/insertUserToCookies";
import { loginSchema } from "@/lib/validation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchPerfilComercial(
  userId: number,
  accessToken: string
): Promise<PerfilComercial | null> {
  //mudar endpoint
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log("data", data);

    return data;
  }

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
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: {},
      message: data.message.toString(),
      error: true,
    };
  }
  const decodedToken = jwt.decode(data.accessToken);
  const userId = (decodedToken as jwt.JwtPayload)?.user_id;

  const perfil = await fetchPerfilComercial(userId, data.accessToken);

  if (!perfil) {
    return {
      errors: {},
      message: "Você não possui uma conta vinculada ao comercial!",
      error: true,
    };
  }
  {
    insertUserToCookies(data, perfil);
  }

  return {
    errors: {},
    message: "Login efetuado com sucesso",
    error: false,
  };
}

export async function refreshToken() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  //console.log("Tentando renovar o token com:", refreshToken);

  if (!refreshToken) return null; // retorna null para evitar erros

  try {
    const decodedToken = jwt.decode(refreshToken);
    const username = (decodedToken as jwt.JwtPayload)?.sub; 

    if (!username) {
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`,
        },
      }
    );

    //console.log("Resposta da API:", response.status);
    const responseBody = await response.json();

    if (!response.ok) return null;

    // retornar um objeto contendo os tokens
    return {
      accessToken: responseBody.accessToken,
      refreshToken: responseBody.refreshToken,
      expiresAt: responseBody.expiresAt,
    };
  } catch (error) {
    console.error("Erro ao tentar renovar o token:", error);
    return null;
  }
}


export async function logout() {


  cookies().delete("accessToken");

  cookies().delete("refreshToken");

  redirect("/auth/login");
}

