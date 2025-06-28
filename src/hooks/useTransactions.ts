import useSWR, { mutate } from "swr";
import { createTransaction } from "@/lib/actions";
import { CACHE_CONFIG } from "@/lib/constants";
import type { Transaction, TransactionResponse } from "@/lib/types/transaction";
import type { CreateTransaction } from "@/lib/types/new-transaction";

interface UseTransactionsOptions {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
}

export function useTransactions(
  userId: string,
  options: UseTransactionsOptions = {}
) {
  const {
    refreshInterval = 0,
    revalidateOnFocus = false,
    revalidateOnReconnect = true,
  } = options;

  const fetcher = async (url: string): Promise<Transaction[]> => {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar transações");
    }

    const data: TransactionResponse[] = await response.json();

    // Converter para Transaction format
    return data.map((t) => ({
      ...t,
      amount: Number(t.amount),
      date: new Date(t.date),
      createdAt: new Date(t.createdAt),
      updatedAt: new Date(t.updatedAt),
    }));
  };

  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    userId ? `/api/transactions?userId=${userId}` : null,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus,
      revalidateOnReconnect,
      dedupingInterval: CACHE_CONFIG.DEDUPING_INTERVAL,
      errorRetryCount: CACHE_CONFIG.ERROR_RETRY_COUNT,
      errorRetryInterval: CACHE_CONFIG.ERROR_RETRY_INTERVAL,
    }
  );

  return {
    transactions: data || [],
    isLoading,
    error,
    refresh: () => mutate(),
    isEmpty: data && data.length === 0,
    addTransactionOptimistic: (newTransaction: Transaction) => {
      const currentData = data || [];
      const updatedData = [newTransaction, ...currentData];
      mutate(updatedData, false);
    },
  };
}

// Hook para revalidar cache após mutações
export function useTransactionMutations() {
  const invalidateCache = async (userId: string) => {
    await Promise.all([
      mutate(`/api/transactions?userId=${userId}`, undefined, {
        revalidate: true,
      }),
      mutate(`/api/transactions`, undefined, { revalidate: true }),
    ]);
  };

  return { invalidateCache };
}

// Hook específico para criar transações com atualização automática
export function useCreateTransaction() {
  const createTransactionWithCache = async (data: CreateTransaction) => {
    try {
      // Optimistic update
      const now = new Date();
      const optimisticTransaction: Transaction = {
        id: `temp-${Date.now()}`,
        ...data,
        date: new Date(data.date),
        amount: Number(data.amount),
        createdAt: now,
        updatedAt: now,
      };

      // Atualizar SWR com dados otimistas
      const swrKey = `/api/transactions?userId=${data.userId}`;
      await mutate(
        swrKey,
        (currentData: Transaction[] = []) => [
          optimisticTransaction,
          ...currentData,
        ],
        false
      );

      // Criar a transação no servidor
      const result = await createTransaction(data);

      if (result.success) {
        // Invalidar para buscar os dados reais do servidor
        await mutate(swrKey, undefined, { revalidate: true });
      } else {
        // Se falhou, reverter o optimistic update
        await mutate(swrKey, undefined, { revalidate: true });
      }

      return result;
    } catch {
      // Reverter optimistic update em caso de erro
      const swrKey = `/api/transactions?userId=${data.userId}`;
      await mutate(swrKey, undefined, { revalidate: true });

      return { success: false, message: "Erro ao criar transação" };
    }
  };

  return { createTransactionWithCache };
}
