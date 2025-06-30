import "../globals.css";
import Sidebar from "@/app/(session)/_components/Sidebar";
import { SIDEBAR_LINKS } from "@/app/(session)/_components/Sidebar/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar links={SIDEBAR_LINKS} />
      <main className="flex-1 text-white overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
