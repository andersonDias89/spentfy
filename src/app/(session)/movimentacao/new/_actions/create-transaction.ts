"use server";

import { prisma } from "@/lib/prisma"; // ajuste o caminho se for diferente
import { CreateTransaction } from "@/types/new-transaction";

export async function createTransaction(data: CreateTransaction) {
  try {
    const dataTransacao = new Date(data.date);
    const agora = new Date();
    agora.setHours(0, 0, 0, 0); // Zera hora para comparar só a data

    if (dataTransacao < agora) {
      return {
        success: false,
        message: "A data da transação não pode ser no passado.",
      };
    }

    await prisma.transaction.create({
      data: {
        ...data,
        amount: Number(data.amount),
        date: dataTransacao, // garantir formato Date
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return { success: false, message: "Erro ao salvar transação." };
  }
}
