"use server";

import { getUserFromCookies } from "@/helpers/getUserFromToken";

export async function getCuidadorById(id: number) {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cuidador:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function setCuidadorStatus(
  id: number,
  status: "Negado" | "Em_Observacao" | "Aprovado"
) {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/atualizar_status_cuidador/${id}`
  );

  const payload = {
    statusCuidador: status,
  };

  try {
    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`, // Inclua o token no cabeçalho de autorização
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update cuidador status:", error);
    throw error; // Re-throw the error after logging it
  }
}

// Adicione a lógica de autorização aos outros métodos neste arquivo

export async function getAllCuidadores(): Promise<any> {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`, // Inclua o token no cabeçalho de autorização
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cuidadores:", error);
    throw error; // Re-throw the error after logging it
  }
}
