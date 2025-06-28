"use server";

import { prisma } from "@/lib/prisma";
import { CreateTransaction } from "@/lib/types/new-transaction";
import { auth } from "@/lib/auth";

export async function createTransaction(data: CreateTransaction) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Não autenticado." };
  }

  try {
    const dataTransacao = new Date(data.date);
    const agora = new Date();
    agora.setHours(0, 0, 0, 0);

    if (dataTransacao < agora) {
      return {
        success: false,
        message: "A data da transação não pode ser no passado.",
      };
    }

    const novaTransacao = await prisma.transaction.create({
      data: {
        ...data,
        userId: session.user.id,
        amount: Number(data.amount),
        date: dataTransacao,
      },
    });

    // Converter Decimal para number para serialização
    const serializedTransaction = {
      ...novaTransacao,
      amount: Number(novaTransacao.amount),
    };

    return { success: true, data: serializedTransaction };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return { success: false, message: "Erro ao salvar transação." };
  }
}
