"use server";

import { prisma } from "@/lib/prisma"; // ajuste o caminho se for diferente
import { CreateTransaction } from "@/types/new-transaction";
import { auth } from "@/lib/auth"; // importe a função de autenticação
import { CacheService } from "@/lib/cache";

export async function createTransaction(data: CreateTransaction) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Não autenticado." };
  }
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
        userId: session.user.id, // sempre use o userId da sessão!
        amount: Number(data.amount),
        date: dataTransacao, // garantir formato Date
      },
    });

    // Invalidar cache das transações do usuário
    CacheService.invalidateUserTransactions(session.user.id);

    return { success: true, shouldRefresh: true };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return { success: false, message: "Erro ao salvar transação." };
  }
}
