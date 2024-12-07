"use server";
import { cookies } from "next/headers";

export async function getUserFromCookies(): Promise<UserSession | null> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userCredentialsCookie = cookieStore.get("userCredentials")?.value;

  if (!accessToken || !userCredentialsCookie) {
    return null;
  }

  // Decodificar o valor do cookie
  const userCredentials = JSON.parse(decodeURIComponent(userCredentialsCookie));

  return {
    userId: userCredentials.userId,
    client: userCredentials.client,
    email: userCredentials.email,
    roles: userCredentials.roles,
    isAuthenticated: true,
    issuedAt: userCredentials.issuedAt,
    expiresAt: userCredentials.expiresAt,
    accessToken: accessToken,
    refreshToken: cookieStore.get("refreshToken")?.value,
  } as UserSession;
}
