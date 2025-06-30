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
      <div className="flex h-screen bg-zinc-950">
        <Sidebar links={SIDEBAR_LINKS} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 text-white overflow-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
