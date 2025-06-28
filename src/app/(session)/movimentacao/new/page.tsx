// app/dashboard/page.tsx
import { auth } from "@/lib/auth"; // ajuste o caminho se for diferente
import { redirect } from "next/navigation";
import CreateTransactionForm from "@/app/(session)/movimentacao/new/_components/CreateTransactionForm";

export default async function CreateTransactionPage() {
  console.log(
    "[CreateTransactionPage] Página de criação de transação acessada. Iniciando autenticação..."
  );
  const session = await auth();
  console.log("[CreateTransactionPage] Resultado da autenticação:", session);

  if (!session) {
    console.log(
      "[CreateTransactionPage] Usuário não autenticado. Redirecionando para a home."
    );
    redirect("/");
  }

  console.log(
    "[CreateTransactionPage] Usuário autenticado. Renderizando formulário de nova movimentação para userId:",
    session.user.id
  );
  return (
    <div className="p-8 mx-auto w-full rounded-md">
      <h1 className="text-xl font-bold text-white mb-4">Nova movimentação</h1>

      <CreateTransactionForm userId={session.user.id} />
    </div>
  );
}
