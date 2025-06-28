import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateTransactionForm } from "@/components";
import { ROUTES } from "@/lib/constants";

export default async function CreateTransactionPage() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.HOME);
  }

  return (
    <div className="p-8 mx-auto w-full rounded-md">
      <h1 className="text-xl font-bold text-white mb-4">Nova movimentação</h1>
      <CreateTransactionForm userId={session.user.id} />
    </div>
  );
}
