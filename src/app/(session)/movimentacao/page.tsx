import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTransactionsByUser } from "@/lib/actions";
import { ROUTES } from "@/lib/constants";
import MovimentacaoClient from "./MovimentacaoClient";

export default async function MovimentacaoPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect(ROUTES.HOME);

  // Buscar dados iniciais do servidor (será usado como fallback)
  const initialTransactions = await getTransactionsByUser(session.user.id);

  return (
    <MovimentacaoClient
      userId={session.user.id}
      initialTransactions={initialTransactions}
    />
  );
}
