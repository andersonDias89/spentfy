// Define Transaction type locally if not available from @prisma/client
type Transaction = {
  id: string;
  title: string;
  date: string | Date;
  amount: number;
  type: "INCOME" | "EXPENSE";
};

import { format } from "date-fns";

interface ListTransactionProps {
  transactions: Transaction[];
}

export default function ListTransaction({
  transactions,
}: ListTransactionProps) {
  if (!transactions.length) {
    return (
      <div className="text-center text-gray-400">
        Nenhuma transação encontrada.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-md overflow-hidden">
      {transactions.map((tx) => (
        <li
          key={tx.id}
          className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${
            tx.type === "INCOME"
              ? "border-l-4 border-green-500"
              : "border-l-4 border-red-500"
          }`}
        >
          <div>
            <div className="font-semibold text-gray-800">{tx.title}</div>
            <div className="text-xs text-gray-500">
              {format(new Date(tx.date), "dd/MM/yyyy")}
            </div>
          </div>
          <div
            className={`text-lg font-bold ${
              tx.type === "INCOME" ? "text-green-600" : "text-red-600"
            }`}
          >
            {tx.type === "INCOME" ? "+" : "-"} R$ {Number(tx.amount).toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
  );
}
