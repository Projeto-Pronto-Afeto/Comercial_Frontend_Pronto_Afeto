"use server";
import { cookies } from "next/headers";

export async function insertClientIdInUserSession(client: Client) {
  const cookieStore = cookies();
  const userCredentialsCookie = cookieStore.get("userCredentials")?.value;
  console.log(
    "🚀 ~ insertClientIdInUserSession ~ userCredentialsCookie:",
    userCredentialsCookie
  );

  if (!userCredentialsCookie) {
    throw new Error("userCredentials cookie not found");
  }

  const userCredentials = JSON.parse(decodeURIComponent(userCredentialsCookie));

  userCredentials.client = client;
  console.log(
    "🚀 ~ insertClientIdInUserSession ~ userCredentials:",
    userCredentials
  );

  cookieStore.set(
    "userCredentials",
    encodeURIComponent(JSON.stringify(userCredentials)),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(userCredentials.expiresAt * 1000), // Convertendo de segundos para milissegundos
    }
  );
}
