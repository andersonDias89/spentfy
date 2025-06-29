"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { Transaction } from "@/lib/types/transaction";
import ListTransaction from "@/components/transactions/ListTransaction";
import { Button } from "@/common/ui";

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
    refreshInterval: 0,
  });

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
  console.log(
    "[MovimentacaoClient] Lista de transações que será exibida:",
    displayTransactions
  );

  return (
    <div className="w-full flex flex-col flex-1 h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Minhas Movimentações</h2>
        <Button>Criar Movimentação</Button>
      </div>
      <div className="flex-1 overflow-auto">
        <ListTransaction transactions={displayTransactions} />
      </div>
    </div>
  );
}
