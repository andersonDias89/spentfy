import useSWR, { mutate } from "swr";
import { createTransaction } from "../app/(session)/movimentacao/new/_actions/create-transaction";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string | Date;
  userId: string;
}

interface CreateTransactionData {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  userId: string;
}

interface TransactionResponse {
  id: string;
  title: string;
  amount: number | { toNumber: () => number };
  type: "INCOME" | "EXPENSE";
  date: string;
  userId: string;
}

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
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao carregar transações");
    }
    const data: TransactionResponse[] = await response.json();

    // Converter Decimal para number se necessário
    return data.map((t: TransactionResponse) => ({
      ...t,
      amount:
        typeof t.amount === "object" && "toNumber" in t.amount
          ? t.amount.toNumber()
          : Number(t.amount),
      date: new Date(t.date),
    }));
  };

  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    userId ? `/api/transactions` : null,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus,
      revalidateOnReconnect,
      dedupingInterval: 60000, // 1 minuto de deduplicação
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    transactions: data || [],
    isLoading,
    error,
    refresh: mutate,
    isEmpty: data && data.length === 0,
  };
}

// Hook para revalidar cache após mutações
export function useTransactionMutations() {
  const invalidateCache = async () => {
    console.log("🔄 Invalidando cache manualmente...");
    // Usa mutate global para invalidar todas as instâncias
    await mutate("/api/transactions", undefined, { revalidate: true });
    console.log("✨ Cache invalidado manualmente!");
  };

  return { invalidateCache };
}

// Hook específico para criar transações com atualização automática
export function useCreateTransaction() {
  const createTransactionWithCache = async (data: CreateTransactionData) => {
    try {
      console.log("🚀 Criando transação...", data);

      // Criar a transação no servidor PRIMEIRO
      const result = await createTransaction(data);

      console.log("✅ Resultado da criação:", result);

      if (result.success) {
        console.log("🔄 Invalidando cache...");

        // Invalidação tripla para garantir que funcione
        await mutate("/api/transactions", undefined, { revalidate: true });

        // Pequeno delay para garantir que a invalidação foi processada
        setTimeout(async () => {
          await mutate("/api/transactions");
          console.log("✨ Cache invalidado com delay!");
        }, 100);

        console.log("✨ Cache invalidado imediatamente!");
      }

      return result;
    } catch (error) {
      console.error("❌ Erro ao criar transação:", error);
      return { success: false, message: "Erro ao criar transação" };
    }
  };

  return { createTransactionWithCache };
}
