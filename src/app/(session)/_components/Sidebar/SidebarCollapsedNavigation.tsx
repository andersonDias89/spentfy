"use client";

import Link from "next/link";
import { SidebarNavigationProps } from "./types";
import { isPathActive, getIcon } from "./utils";

export default function SidebarCollapsedNavigation({
  links,
  currentPath,
}: SidebarNavigationProps) {
  return (
    <nav className="flex flex-col gap-4 w-full items-center mt-4">
      {links.map((link) => {
        const Icon = getIcon(link.iconName);
        const isActive = isPathActive(currentPath, link.href);

        return (
          <Link key={link.id} href={link.href}>
            <button
              className={`
                w-10 h-10 flex items-center justify-center rounded-lg
                transition-all duration-200 hover:scale-105
                ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg hover:bg-green-700"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-700"
                }
              `}
              aria-current={isActive ? "page" : undefined}
              title={link.label}
              aria-label={link.label}
            >
              <Icon size={20} />
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
