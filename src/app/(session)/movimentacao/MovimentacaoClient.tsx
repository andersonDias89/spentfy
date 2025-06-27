"use client";

import HeaderAccordion from "./_components/HeaderAccordion";
import ListTransaction from "./_components/ListTransaction";
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
  transactions: Transaction[];
}

export default function MovimentacaoClient({
  userId,
  transactions,
}: MovimentacaoClientProps) {
  function handleSuccess() {
    // Exemplo: window.location.reload() ou lógica de atualização de estado
  }
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <HeaderAccordion userId={userId} onSuccess={handleSuccess} />
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Minhas Movimentações
      </h2>
      <ListTransaction transactions={transactions} />
    </div>
  );
}
