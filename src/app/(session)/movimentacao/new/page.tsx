// app/dashboard/page.tsx
import { auth } from "@/lib/auth"; // ou onde estiver seu arquivo de auth
import { redirect } from "next/navigation";

export default async function CreateTransactionPage() {
  const session = await auth(); // já traz a sessão do usuário

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Nova movimentação</h1>
    </div>
  );
}
