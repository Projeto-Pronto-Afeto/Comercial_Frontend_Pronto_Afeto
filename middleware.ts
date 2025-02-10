import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
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
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isLoggedIn = Boolean(accessToken);

  console.log("Acessando Middleware");

  // Caso 01 - O usuário está tentando acessar uma Rota Pública.
  if (isLoggedIn && isPublicRoute) {
    console.log("Acessando 01");

    return Response.redirect(new URL("/", nextUrl));

  }

  // Caso 02 - Usuário não Logou e está tentando acessar uma rota pública!
  if (!isLoggedIn && !isPublicRoute) {
    console.log("Acessando 02");
    console.log("Usuário não logado!");

    return NextResponse.redirect(new URL("/auth/login", nextUrl));

  }

  // Caso 03 - Usuário está logado, mas o token pode estar expirado → Tenta renovar o token
  if (isLoggedIn && !isPublicRoute) {
    console.log("Acessando 03");

    const user = await getUserFromCookies();

    if (!user) {
      console.log("Acessando if(!user)");


      return NextResponse.redirect(new URL("/auth/login", nextUrl));

    }
    console.log("é verdade");

    const isTokenValid = await refreshToken();
    console.log("isTokenValid", isTokenValid);

    if (!isTokenValid) {
      console.log("Acessando if(!isTokenValid)");

      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    console.log("voce é maluco?");

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
