import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.HOME);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Olá, {session.user?.name}</h1>
    </div>
  );
}
