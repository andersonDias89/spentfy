import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTransactionsByUser } from "./_actions/get-transactions";
import MovimentacaoClient from "./MovimentacaoClient";

export default async function MovimentacaoPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  const transactions = await getTransactionsByUser(session.user.id);

  return (
    <MovimentacaoClient
      userId={session.user.id}
      transactions={transactions.map((t) => ({
        ...t,
        amount:
          typeof t.amount === "object" && "toNumber" in t.amount
            ? t.amount.toNumber()
            : t.amount,
      }))}
    />
  );
}
