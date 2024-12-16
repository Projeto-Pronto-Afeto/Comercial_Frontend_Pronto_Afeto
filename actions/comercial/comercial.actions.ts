import { getUserFromCookies } from "@/helpers/getUserFromToken";

// Function for remove comercial users
export type StateRemove = {
  errors: {
    id?: string[] | undefined;
  };
  message?: string | null;
  error?: boolean;
};

export const removeUser = async (
  previousState: StateRemove,
  formData: FormData
): Promise<StateRemove> => {
  const id = formData.get("id") as string;
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`, // Inclua o token no cabeçalho de autorização
        },
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      ...previousState,
      message: data.message,
      error: false,
    };
  } catch (error) {
    console.error("Failed to remove user:", error);
    return {
      ...previousState,
      message: "ocorreu um erro ao remover o usuário",
      error: true,
    };
  }
};

// Adicione a lógica de autorização aos outros métodos neste arquivo

export const getAllUsers = async (): Promise<any> => {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/users`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`, // Inclua o token no cabeçalho de autorização
        },
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const createUser = async (formData: FormData): Promise<any> => {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/users`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`, // Inclua o token no cabeçalho de autorização
        },
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const updateUser = async (
  id: string,
  formData: FormData
): Promise<any> => {
  const user = await getUserFromCookies();
  if (!user) throw new Error("User not found");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comercial/v1/users/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`, // Inclua o token no cabeçalho de autorização
        },
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error; // Re-throw the error after logging it
  }
};
