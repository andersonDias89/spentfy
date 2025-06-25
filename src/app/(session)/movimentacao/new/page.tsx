// app/dashboard/page.tsx
import { auth } from "@/lib/auth"; // ajuste o caminho se for diferente
import { redirect } from "next/navigation";
import CreateTransactionForm from "@/app/(session)/movimentacao/new/_components/CreateTransactionForm";

export default async function CreateTransactionPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-white mb-4">Nova movimentação</h1>

      <CreateTransactionForm userId={session.user.id} />
    </div>
  );
}
