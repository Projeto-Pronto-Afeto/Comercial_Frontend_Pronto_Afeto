export async function getCuidadoresByStatus(page:number = 0, limit:number = 12,status ='Em_Observacao'):Promise<Caregiver[]>{
    const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1/order_by_stats?page=${page}&limit=${limit}&status=${status}`
    );
    const stringUrl = url.toString();
    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    
        console.log("🚀 ~ data", data);
        return data.content;
      } catch (error) {
        console.error("Failed to fetch propostas:", error);
        throw error; // Re-throw the error after logging it
      }
}