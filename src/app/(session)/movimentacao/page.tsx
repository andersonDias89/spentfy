import { auth } from "@/lib/auth";
import CreateTransactionForm from "@/app/(session)/movimentacao/new/_components/CreateTransactionForm";
import { redirect } from "next/navigation";

export default async function NovaMovimentacaoPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-4 grid-cols-2 w-200">
        <h1 className="text-xl font-bold mb-4">Nova Movimentação</h1>
        <CreateTransactionForm userId={session.user.id} />
      </div>
    </div>
  );
}
