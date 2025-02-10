import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function getUserFromCookies(
  cookiesFromRequest?: NextRequest["cookies"]
): Promise<UserSession | null> {
  
  const cookieStore = cookiesFromRequest ?? cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userCredentialsCookie = cookieStore.get("userCredentials")?.value;

  if (!accessToken || !userCredentialsCookie) {
    return null;
  }

  // decodifica o valor do cookie
  try {
    const userCredentials = JSON.parse(decodeURIComponent(userCredentialsCookie));

    return {
      userId: userCredentials.userId,
      perfil: userCredentials.perfil,
      email: userCredentials.email,
      roles: userCredentials.roles,
      isAuthenticated: true,
      issuedAt: userCredentials.issuedAt,
      expiresAt: userCredentials.expiresAt,
      accessToken: accessToken,
      refreshToken: cookieStore.get("refreshToken")?.value,
    } as UserSession;
  } catch (error) {
    console.error("Erro ao decodificar userCredentials:", error);
    return null;
  }
}
