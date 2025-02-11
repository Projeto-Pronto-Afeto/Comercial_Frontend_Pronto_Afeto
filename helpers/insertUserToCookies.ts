import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Função auxiliar para buscar o perfile

export async function insertUserToCookies(
  session: Session,
  perfil: PerfilComercial | null
): Promise<NextResponse> {
  const response = new NextResponse();
  const cookieStore = cookies();

  // define o accessToken e refreshToken nos cookies
  cookieStore.set("accessToken", session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(session.expiresAt * 1000),
  });

  cookieStore.set("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(session.expiresAt * 1000),
  });

  // decodifica o token e obtem o userId
  const decodedToken = jwt.decode(session.accessToken);

  const userCredentials = {
    userId: (decodedToken as jwt.JwtPayload)?.user_id,
    email: (decodedToken as jwt.JwtPayload)?.sub,
    roles: (decodedToken as jwt.JwtPayload)?.roles,
    isAuthenticated: true,
    issuedAt: session.issuedAt,
    expiresAt: session.expiresAt,
    perfil: perfil,
  };

  cookieStore.set(
    "userCredentials",
    encodeURIComponent(JSON.stringify(userCredentials)),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(session.expiresAt * 1000),
    }
  );

  //console.log("Cookies setados na resposta:", response.headers.getSetCookie());
  return response;
}
