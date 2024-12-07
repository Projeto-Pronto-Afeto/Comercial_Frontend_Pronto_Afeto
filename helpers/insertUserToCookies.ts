import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Função auxiliar para buscar o perfile

export async function insertUserToCookies(
  session: Session,
  perfil: PerfilComercial | null
): Promise<void> {
  const cookieStore = cookies();

  // Defina o accessToken e refreshToken nos cookies
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

  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
  }

  // Decodifique o token e obtenha o userId
  const decodedToken = jwt.decode(session.accessToken);

  // Aguardamos a obtenção do perfile antes de configurar o cookie `userCredentials`

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
}
