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
  amount: number; // Agora sempre number pois a API já converte
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
  console.log(
    "[useTransactions] Hook chamado. userId:",
    userId,
    "options:",
    options
  );
  const {
    refreshInterval = 0,
    revalidateOnFocus = false,
    revalidateOnReconnect = true,
  } = options;

  const fetcher = async (url: string): Promise<Transaction[]> => {
    console.log(`[useTransactions] Fetcher chamado para url: ${url}`);
    const response = await fetch(url, {
      cache: "no-store", // Força sempre buscar dados frescos
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!response.ok) {
      console.error(
        "[useTransactions] Erro ao carregar transações. Status:",
        response.status
      );
      throw new Error("Erro ao carregar transações");
    }
    const data: TransactionResponse[] = await response.json();
    console.log("[useTransactions] Dados recebidos do backend:", data);

    // Converter para Transaction format
    const parsed = data.map((t: TransactionResponse) => ({
      ...t,
      amount: Number(t.amount), // Garantir que é number
      date: new Date(t.date),
    }));
    console.log(
      "[useTransactions] Dados convertidos para Transaction:",
      parsed
    );
    return parsed;
  };

  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    userId ? `/api/transactions?userId=${userId}` : null,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus,
      revalidateOnReconnect,
      dedupingInterval: 2000, // Reduzido para 2 segundos para atualização mais rápida
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  console.log("[useTransactions] Retorno do hook:", {
    transactions: data || [],
    isLoading,
    error,
  });

  return {
    transactions: data || [],
    isLoading,
    error,
    refresh: () => mutate(),
    isEmpty: data && data.length === 0,
    // Função para atualizar com optimistic update
    addTransactionOptimistic: (newTransaction: Transaction) => {
      const currentData = data || [];
      const updatedData = [newTransaction, ...currentData];
      mutate(updatedData, false); // false = não revalidar imediatamente
    },
  };
}

// Hook para revalidar cache após mutações
export function useTransactionMutations() {
  const invalidateCache = async (userId: string) => {
    console.log("🔄 Invalidando cache do SWR...");
    // Invalidar tanto a chave com userId quanto sem
    await Promise.all([
      mutate(`/api/transactions?userId=${userId}`, undefined, {
        revalidate: true,
      }),
      mutate(`/api/transactions`, undefined, { revalidate: true }),
    ]);
    console.log("✨ Cache do SWR invalidado!");
  };

  return { invalidateCache };
}

// Hook específico para criar transações com atualização automática
export function useCreateTransaction() {
  const createTransactionWithCache = async (data: CreateTransactionData) => {
    try {
      console.log("🚀 Criando transação...", data);

      // Optimistic update - adicionar à lista antes mesmo de salvar no servidor
      const optimisticTransaction: Transaction = {
        id: `temp-${Date.now()}`, // ID temporário
        ...data,
        date: new Date(data.date),
        amount: Number(data.amount),
      };

      // Atualizar SWR com dados otimistas
      const swrKey = `/api/transactions?userId=${data.userId}`;
      await mutate(
        swrKey,
        (currentData: Transaction[] = []) => [
          optimisticTransaction,
          ...currentData,
        ],
        false // Não revalidar ainda
      );

      // Criar a transação no servidor
      const result = await createTransaction(data);

      console.log("✅ Resultado da criação:", result);

      if (result.success) {
        console.log("🔄 Invalidando cache para buscar dados reais...");

        // Agora invalidar para buscar os dados reais do servidor
        await mutate(swrKey, undefined, { revalidate: true });

        console.log("✨ Cache invalidado e dados reais carregados!");
      } else {
        // Se falhou, reverter o optimistic update
        await mutate(swrKey, undefined, { revalidate: true });
      }

      return result;
    } catch (error) {
      console.error("❌ Erro ao criar transação:", error);

      // Reverter optimistic update em caso de erro
      const swrKey = `/api/transactions?userId=${data.userId}`;
      await mutate(swrKey, undefined, { revalidate: true });

      return { success: false, message: "Erro ao criar transação" };
    }
  };

  return { createTransactionWithCache };
}
