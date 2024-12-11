import { te } from "date-fns/locale";
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




export const cuidadorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  nomeApresentacao: z.string().min(1, "Nome de apresentação é obrigatório"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 dígitos")
    .max(15, "Telefone deve ter no máximo 15 dígitos"),
  rg: z.string().min(1, "RG é obrigatório"),
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z
    .string()
    .min(1, "Número é obrigatório")
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Número deve ser um número positivo",
    }),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  complemento: z.string().optional(),
  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 00000-000"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  nomePai: z.string().min(1, "Nome do pai é obrigatório"),
  nomeMae: z.string().min(1, "Nome da mãe é obrigatório"),
  dataNascimento: z
    .date(),
  peso: z
    .string()
    .min(1, "Peso é obrigatório")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Peso deve ser um número positivo",
    }),
  altura: z
    .string()
    .min(1, "Altura é obrigatória")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Altura deve ser um número positivo",
    }),
  escolaridade: z.enum([
    "NÍVEL_FUNDAMENTAL",
    "NÍVEL_MÉDIO",
    "NÍVEL_SUPERIOR",
  ]),
  titulacao: z.string().min(1, "Titulação é obrigatória"),
  tempoExperiencia: z
    .string()
    .min(1, "Tempo de experiência é obrigatório")
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Tempo de experiência deve ser um número não negativo",
    }),
  habilidades: z
  .string(),
  experiencias: z
  .string(),
  apresentacao: z.string().min(1, "Apresentação é obrigatória"),
})

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const createUserSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  image: z.any(),
  password: z.string().min(1, "Senha é obrigatória"),

});
