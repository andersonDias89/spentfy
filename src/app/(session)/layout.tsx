import "../globals.css";
import Sidebar from "@/app/(session)/_components/Sidebar";
import { ROUTES } from "@/lib/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar
        links={[
          { label: "Dashboard", href: ROUTES.DASHBOARD },
          { label: "Transações", href: ROUTES.TRANSACTIONS },
        ]}
      />
      <main className="flex-1 bg-zinc-950 text-white min-h-screen p-4">
        {children}
      </main>
    </div>
  );
}
