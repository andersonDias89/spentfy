// app/dashboard/layout.tsx
import "../globals.css"; // ajuste conforme seu path real
import Sidebar from "@/app/(session)/_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transações", href: "/movimentacao" },
        ]}
      />
      <main className="flex-1 bg-zinc-950 text-white min-h-screen p-4">
        {children}
      </main>
    </div>
  );
}
