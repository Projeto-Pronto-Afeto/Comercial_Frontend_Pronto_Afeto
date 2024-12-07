import { z } from "zod";

export const acceptProposalSchema = z.object({
  observacoes: z.string().min(1, "Observações são obrigatórias"),
  valor: z
    .string()
    .min(1, "O valor é obrigatório")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "O valor deve ser um número positivo",
    }),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});
