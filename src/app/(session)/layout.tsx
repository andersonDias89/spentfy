import "../globals.css";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/app/(session)/_components/Sidebar";
import Header from "@/app/(session)/_components/Header";
import { SIDEBAR_LINKS } from "@/app/(session)/_components/Sidebar/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="h-screen bg-zinc-950 flex flex-col">
        {/* Header fixo no topo */}
        <Header className="fixed top-0 left-0 right-0 z-50 shadow-lg" />

        {/* Container para Sidebar + Conteúdo principal */}
        <div className="flex flex-1 pt-16 overflow-hidden">
          <Sidebar links={SIDEBAR_LINKS} />
          <main className="flex-1 text-white overflow-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
