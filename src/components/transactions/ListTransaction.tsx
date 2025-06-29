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
  console.log(
    `[ListTransaction] Renderizando lista de transações. Quantidade recebida do hook ou props: ${transactions.length}`
  );
  if (!transactions.length) {
    console.log(
      "[ListTransaction] Nenhuma transação encontrada. O array de transações está vazio."
    );
    return (
      <div className="text-center text-gray-400">
        Nenhuma transação encontrada.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200  bg-zinc-900 rounded-lg shadow-md overflow-hidden">
      {transactions.map((tx, idx) => {
        console.log(
          `[ListTransaction] Transação #${idx + 1} recebida para renderização:`,
          {
            id: tx.id,
            title: tx.title,
            date: tx.date,
            amount: tx.amount,
            type: tx.type,
            mensagem: `Esta é a transação de número ${
              idx + 1
            } da lista que está sendo exibida na tela.`,
          }
        );
        return (
          <li
            key={tx.id}
            className={`flex items-center justify-between px-6 py-4 hover:bg-zinc-800 transition-colors duration-700 cursor-pointer ${
              tx.type === "INCOME"
                ? "border-l-4 border-green-800"
                : "border-l-4 border-red-900"
            }`}
          >
            <div>
              <div className="font-semibold text-white">{tx.title}</div>
              <div className="text-xs text-zinc-400">
                {format(new Date(tx.date), "dd/MM/yyyy")}
              </div>
            </div>
            <div
              className={`text-lg font-bold ${
                tx.type === "INCOME" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "INCOME" ? "+" : "-"} R${" "}
              {Number(tx.amount).toFixed(2)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
