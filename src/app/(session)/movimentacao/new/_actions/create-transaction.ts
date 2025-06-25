"use server";

import { prisma } from "@/lib/prisma"; // ajuste o caminho se for diferente
import { CreateTransaction } from "@/types/new-transaction";

export async function createTransaction(data: CreateTransaction) {
  try {
    await prisma.transaction.create({
      data: {
        ...data,
        amount: Number(data.amount),
        date: new Date(data.date), // garantir formato Date
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return { success: false, message: "Erro ao salvar transação." };
  }
}
