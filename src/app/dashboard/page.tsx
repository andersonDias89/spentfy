import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="">
      <h1>Olá {session.user.name}</h1>
      <p>{session.user.email}</p>
    </div>
  );
}
