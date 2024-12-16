import { getUserFromCookies } from "@/helpers/getUserFromToken";

export async function getAllContracts({
  status,
  page = 0,
  limit = 12,
  direction = "desc",
}: {
  status?: string;
  page?: number;
  limit?: number;
  direction?: string;
}): Promise<ContratoDTOGet> {
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
      next: { tags: ["contratos"], revalidate: 300 },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch contratos:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function getContractById(id: number) {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contratos/v1/${id}`,
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
    console.error("Failed to fetch contract:", error);
    throw error; // Re-throw the error after logging it
  }
}
