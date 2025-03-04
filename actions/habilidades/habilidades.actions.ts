export async function getAllHabilidades(): Promise<{
  error: boolean;
  data?: HabilityDTOGet;
  message?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/patologias/habilidades?page=0&limit=100`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    console.log("🚀 ~ getAllHabilidades ~ resData:", resData);
    return { error: false, data: resData as PatologyDtoGet };
  } catch (error) {
    console.error("Error fetching patologias:", error);
    return { error: true, message: "Failed to fetch patologias" };
  }
}
