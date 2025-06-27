import { prisma } from "@/lib/prisma";
import { CacheService } from "@/lib/cache";
import { Decimal } from "@prisma/client/runtime/library";

interface TransactionFromDB {
  id: string;
  title: string;
  amount: Decimal;
  type: "INCOME" | "EXPENSE";
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: Date;
  userId: string;
}

export async function getTransactionsByUser(
  userId: string,
  useCache: boolean = true
): Promise<TransactionFromDB[]> {
  if (!userId) {
    return [];
  }

  const cacheKey = CacheService.generateTransactionKey(userId);

  // Tentar buscar do cache primeiro
  if (useCache) {
    const cachedTransactions = CacheService.get<TransactionFromDB[]>(cacheKey);
    if (cachedTransactions) {
      return cachedTransactions;
    }
  }

  // Se não estiver no cache, buscar do banco
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  // Salvar no cache
  if (useCache) {
    CacheService.set(cacheKey, transactions);
  }

  return transactions;
}
