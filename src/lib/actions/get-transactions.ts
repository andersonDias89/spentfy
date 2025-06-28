import { prisma } from "@/lib/prisma";
import { CacheService } from "@/lib/cache";

interface TransactionFromDB {
  id: string;
  title: string;
  amount: number; // Mudado para number já que vamos converter
  type: "INCOME" | "EXPENSE";
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getTransactionsByUser(
  userId: string,
  useCache: boolean = true
): Promise<TransactionFromDB[]> {
  console.log(
    `[getTransactionsByUser] Função chamada para buscar transações do usuário. userId recebido: ${userId} | useCache: ${useCache}`
  );
  if (!userId) {
    console.log(
      "[getTransactionsByUser] Atenção: Nenhum userId foi informado para a busca. Retornando lista vazia."
    );
    return [];
  }

  const cacheKey = CacheService.generateTransactionKey(userId);
  console.log(
    `[getTransactionsByUser] Chave de cache gerada para este usuário: ${cacheKey}`
  );

  // Tentar buscar do cache primeiro
  if (useCache) {
    const cachedTransactions = CacheService.get<TransactionFromDB[]>(cacheKey);
    if (cachedTransactions) {
      console.log(
        `[getTransactionsByUser] Resultado encontrado no cache! Quantidade de transações retornadas do cache: ${cachedTransactions.length}`
      );
      return cachedTransactions;
    } else {
      console.log(
        "[getTransactionsByUser] Nenhum resultado encontrado no cache para este usuário. Será feita busca no banco de dados."
      );
    }
  }

  // Se não estiver no cache, buscar do banco
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
  console.log(
    `[getTransactionsByUser] Busca realizada no banco de dados. Quantidade de transações encontradas: ${transactions.length}`
  );

  // Converter Decimal para number antes de salvar no cache
  const serializedTransactions = transactions.map(transaction => ({
    ...transaction,
    amount: Number(transaction.amount), // Converter Decimal para number
  }));

  // Salvar no cache
  if (useCache) {
    CacheService.set(cacheKey, serializedTransactions);
    console.log(
      "[getTransactionsByUser] Resultado salvo no cache para futuras consultas deste usuário."
    );
  }

  return serializedTransactions;
}
