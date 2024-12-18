import { revalidatePath } from "next/cache";

export async function getAllCuidadores(
  page: number = 0,
  limit: number = 12,
  status: string
): Promise<CaregiverDtoGet> {
  const params = new URLSearchParams();
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1`);

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  url.search = params.toString();

  try {
    const response = await fetch(url.toString(), {
      next: { tags: ["cuidadores"] },
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch propostas:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function getCuidadorById(id: string): Promise<Caregiver> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/${id}`,
      { cache: "no-cache" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch proposta:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function setCuidadorStatus(
  id: number,
  status: "Negado" | "Em_Observacao" | "Aprovado"
) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/atualizar_status_cuidador/${id}`
  );
  console.log("🚀 ~ Chamando setstatus");
  const payload = {
    statusCuidador: status,
  };

  //Por algum motivo isso aqui dá problema de CORS no preflight. A mesma chamada funciona no insomnia.
  fetch(url.toString(), {
    next: { tags: ["cuidadores"], revalidate: 600 },
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log("🚀 ~ res", res);
      revalidatePath("cuidadores");
    })
    .catch((err) => {
      console.error("Falha de alterar status do cuidador:", err);
      throw err;
    });
}
