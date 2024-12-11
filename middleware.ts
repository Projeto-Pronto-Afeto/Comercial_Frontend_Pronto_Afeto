import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromCookies } from "./helpers/getUserFromToken";
import { insertUserToCookies } from "./helpers/insertUserToCookies";

const PUBLIC_ROUTES = ["/auth/login", "/auth/sign-up", "/auth-callback"];

async function refreshToken(token: string | undefined) {
  const user = await getUserFromCookies();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/auth/refresh${user?.userName}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );

    const newToken = await response.json();
    // insertUserToCookies(newToken);
    return response.ok;
  } catch (error) {
    console.error("Erro na Validação do Token: ", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isLoggedIn = Boolean(accessToken);

  // Caso 01 - O usuário está tentando acessar uma Rota Pública.
  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  // Caso 02 - Usuário não Logou e está tentando acessar uma rota pública!
  if (!isLoggedIn && !isPublicRoute) {
    console.log("Usuário não logado!");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  //   Caso 03 - Usuário Logou e está tentando acessar uma rota pública, mas o token expirou!
  //   if (isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/expired") {
  //     const isTokenValid = await validateToken(accessToken);
  //     console.log("Token  : ", isTokenValid);
  //     if (!isTokenValid) {
  //       return NextResponse.redirect(new URL("/expired", nextUrl));
  //     }
  //   }
  //   Caso 04 - Usuário está tentando acessar a rota /expired, mas o token ainda é válido.
  //   if (isLoggedIn && nextUrl.pathname === "/expired") {
  //     const isTokenValid = await validateToken(accessToken);
  //     if (isTokenValid) {
  //       return NextResponse.redirect(new URL("/", nextUrl));
  //     }
  //   }
  //   Permite que o request continue.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets/icons|assets|icons|mail.svg|logo.svg|login_back.svg|microsoft.png|expired-confused-guy.svg|error-people.png).*)",
  ],
};
