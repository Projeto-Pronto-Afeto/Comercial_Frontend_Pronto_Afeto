import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "./helpers/getUserFromToken";
import { refreshToken } from "@/actions/auth/auth.actions";

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/sign-up",
  "/auth-callback",
  "/registro-cuidador",
];

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const accessToken = request.cookies.get("accessToken")?.value;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isLoggedIn = Boolean(accessToken);

  // Caso 01 - O usuário está tentando acessar uma Rota Pública.
  if (isLoggedIn && isPublicRoute) {
    //console.log("Acessando 01");
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Caso 02 - Usuário deslogado ou token expirado e está tentando acessar uma rota privada!
  if (!isLoggedIn && !isPublicRoute) {
    //console.log("Acessando 02 - Usuário não logado!");

    let user = await getUserFromCookies();
    console.log("User", user);

    // Caso não existir um usuário, ele tenta renovar o token.
    // Se tiver um refresh token válido nos cookies, ele renova o token.
    if (!user) {
      //console.log("Token expirado. Tentando renovar...");

      const newTokenData = await refreshToken();

      if (!newTokenData || !newTokenData.accessToken || !newTokenData.refreshToken) {
        console.log("Falha ao renovar o token.");
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
      }

      const response = NextResponse.next();

      response.headers.set(
        "Set-Cookie",
        `accessToken=${newTokenData.accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
          newTokenData.expiresAt * 1000
        ).toUTCString()}`
      );

      response.headers.append(
        "Set-Cookie",
        `refreshToken=${newTokenData.refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
          newTokenData.expiresAt * 1000
        ).toUTCString()}`
      );

      //console.log("Token renovado com sucesso.");
      return response;
    }
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
    
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets/icons|assets|icons).*)",
  ],
};
