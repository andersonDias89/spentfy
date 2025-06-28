"use client";

import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import SidebarClosedIcon from "../../../common/ui/icons/SidebarClosedIcon";
import SidebarHoverIcon from "../../../common/ui/icons/SidebarHoverIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarProps {
  links: SidebarLink[];
  className?: string;
}

export default function Sidebar({ links, className = "" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const router = useRouter();

  function transactionNew() {
    router.push(ROUTES.NEW_TRANSACTION);
  }

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const renderToggleIcon = () => {
    if (isOpen || hovering) {
      return (
        <SidebarHoverIcon className="w-6 h-6 text-zinc-300 hover:text-white" />
      );
    }
    return (
      <SidebarClosedIcon className="w-6 h-6 text-zinc-300 hover:text-white" />
    );
  };

  return (
    <div className={`flex ${className}`}>
      {/* Sidebar Lateral */}
      <div className="bg-zinc-800 h-screen flex flex-col items-center p-4 transition-all duration-300">
        <div
          className="mb-6"
          onClick={toggleSidebar}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {renderToggleIcon()}
        </div>

        {!isOpen && (
          <button
            onClick={transactionNew}
            className="bg-green-600 hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full"
          >
            <PiPlusBold className="text-zinc-300" size={22} />
          </button>
        )}
      </div>

      {/* Conteúdo Expandido */}
      <div
        className={`bg-zinc-900 text-white transition-all duration-300 overflow-hidden ${
          isOpen ? "w-64 p-4" : "w-0 p-0"
        }`}
      >
        {isOpen && (
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-sm mb-1">Sua Biblioteca</h2>
            </div>

            <div className="bg-zinc-800 rounded p-3 flex flex-col gap-2">
              <p className="font-bold text-sm">
                Crie agora sua movimentação financeira
              </p>
              <p className="text-sm text-zinc-400">É fácil e prático</p>
              <button
                onClick={transactionNew}
                className="bg-green-700 h-10 hover:bg-green-800 transition mt-3 text-sm font-bold text-white px-3 py-1 rounded-full hover:opacity-80"
              >
                Criar Movimentação
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <button className="bg-zinc-900 hover:bg-zinc-800 w-full text-left px-2 py-2 rounded text-sm">
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
