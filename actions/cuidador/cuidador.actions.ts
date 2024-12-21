"use server";

import { getUserFromCookies } from "@/helpers/getUserFromToken";
import { revalidateTag } from "next/cache";

export async function getCuidadorById(id: number) {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/${id}`,
      {
        next: {
          tags: ["cuidador"],
        },
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
    console.log("🚀 ~ getCuidadorById ~ data:", data);

    return data;
  } catch (error) {
    console.error("Failed to fetch cuidador:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function setCuidadorStatus(id: number, status: string) {
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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    revalidateTag("cuidador");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update cuidador status:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function getAllCuidadores({
  page,
  limit,
  status,
}: {
  page: number;
  limit?: number;
  status: string;
}): Promise<CaregiverDtoGet> {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/contratos/v1`);
  const params = new URLSearchParams();

  //   if (status) params.append("status", status);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  url.search = params.toString();

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      cache: "no-cache",
    });

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
