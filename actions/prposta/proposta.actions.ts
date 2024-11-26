export async function getAllPropostas() {
  try {
    const response = await fetch("http://localhost:8080/api/propostas/v1");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch propostas:", error);
    throw error; // Re-throw the error after logging it
  }
}
