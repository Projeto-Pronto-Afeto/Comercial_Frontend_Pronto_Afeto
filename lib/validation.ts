import { z } from "zod";

export const signUpFormSchema = z.object({
    nomeCompleto: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });
  