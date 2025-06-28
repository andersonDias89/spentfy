"use server";

import { prisma } from "@/lib/prisma";
import { CreateTransaction } from "@/types/new-transaction";
import { auth } from "@/lib/auth";

export async function createTransaction(data: CreateTransaction) {
  console.log(
    "[createTransaction] Função chamada para criar nova transação. Dados recebidos:",
    data
  );
  const session = await auth();
  if (!session?.user?.id) {
    console.log(
      "[createTransaction] Falha de autenticação: usuário não está logado."
    );
    return { success: false, message: "Não autenticado." };
  }
  try {
    const dataTransacao = new Date(data.date);
    const agora = new Date();
    agora.setHours(0, 0, 0, 0); // Zera hora para comparar só a data

    if (dataTransacao < agora) {
      console.log(
        "[createTransaction] Data da transação no passado. Operação não permitida."
      );
      return {
        success: false,
        message: "A data da transação não pode ser no passado.",
      };
    }

    const novaTransacao = await prisma.transaction.create({
      data: {
        ...data,
        userId: session.user.id, // sempre use o userId da sessão!
        amount: Number(data.amount),
        date: dataTransacao, // garantir formato Date
      },
    });
    console.log(
      "[createTransaction] Transação criada com sucesso no banco de dados:",
      novaTransacao
    );

    // Converter Decimal para number para serialização
    const serializedTransaction = {
      ...novaTransacao,
      amount: Number(novaTransacao.amount), // Converter Decimal para number
    };

    return { success: true, data: serializedTransaction };
  } catch (error) {
    console.error("[createTransaction] Erro ao criar transação:", error);
    return { success: false, message: "Erro ao salvar transação." };
  }
}
