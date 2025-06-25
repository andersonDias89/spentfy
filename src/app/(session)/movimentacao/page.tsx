import { auth } from "@/lib/auth";
import CreateTransactionForm from "@/app/(session)/movimentacao/new/_components/CreateTransactionForm";
import { redirect } from "next/navigation";

export default async function NovaMovimentacaoPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Nova Movimentação</h1>
      <CreateTransactionForm userId={session.user.id} />
    </div>
  );
}
