import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  amount: z
    .number({ invalid_type_error: "Insira um número válido" })
    .min(0.01, "Valor mínimo é R$ 0,01"),
  type: z.enum(["INCOME", "EXPENSE"], {
    required_error: "Campo obrigatório",
  }),
  date: z.string().min(1, "Campo obrigatório"),
  userId: z.string(),
});
