"use client";

import HeaderAccordion from "./_components/HeaderAccordion";
import ListTransaction from "./_components/ListTransaction";
import {
  useTransactions,
  useTransactionMutations,
} from "@/hooks/useTransactions";

// Importa o tipo Transaction do ListTransaction para garantir compatibilidade
// Usa o mesmo tipo Transaction do ListTransaction
type Transaction = {
  id: string;
  title: string;
  date: string | Date;
  amount: number;
  type: "INCOME" | "EXPENSE";
};

interface MovimentacaoClientProps {
  userId: string;
  initialTransactions?: Transaction[];
}

export default function MovimentacaoClient({
  userId,
  initialTransactions = [],
}: MovimentacaoClientProps) {
  // Usar o hook de cache para buscar transações
  const { transactions, isLoading, error, refresh } = useTransactions(userId, {
    revalidateOnFocus: false,
    refreshInterval: 0, // Não revalidar automaticamente
  });

  // Hook para invalidar cache após mutações
  const { invalidateCache } = useTransactionMutations();

  function handleSuccess() {
    // Invalidar cache para buscar dados atualizados
    invalidateCache();
    // Ou usar refresh() para revalidar imediatamente
    refresh();
  }

  // Mostrar loading enquanto carrega
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Carregando transações...</div>
        </div>
      </div>
    );
  }

  // Mostrar erro se houver
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-700">Erro ao carregar transações:</p>
          <p className="text-red-600 text-sm">{error.message}</p>
          <button
            onClick={() => refresh()}
            className="mt-2 text-red-700 underline hover:text-red-800"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Usar dados do cache ou dados iniciais como fallback
  const displayTransactions =
    transactions.length > 0 ? transactions : initialTransactions;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <HeaderAccordion userId={userId} onSuccess={handleSuccess} />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Minhas Movimentações
        </h2>
        <button
          onClick={() => refresh()}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
          disabled={isLoading}
        >
          {isLoading ? "Atualizando..." : "Atualizar"}
        </button>
      </div>
      <ListTransaction transactions={displayTransactions} />
    </div>
  );
}
