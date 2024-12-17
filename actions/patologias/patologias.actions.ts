export async function getAllPatologias(): Promise<{
  error: boolean;
  data?: PatologyDtoGet;
  message?: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/patologias?page=0&limit=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    return { error: false, data: resData as PatologyDtoGet };
  } catch (error) {
    console.error("Error fetching patologias:", error);
    return { error: true, message: "Failed to fetch patologias" };
  }
}
