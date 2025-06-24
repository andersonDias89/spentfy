import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="">
      <h1>Olá {session.user.name}</h1>
      <p>{session.user.email}</p>
    </div>
  );
}
