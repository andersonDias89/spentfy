"use client";

import Link from "next/link";
import { SidebarNavigationProps } from "./types";
import { SIDEBAR_STYLES } from "./constants";
import { isPathActive, cn, getIcon } from "./utils";

export default function SidebarNavigation({
  links,
  currentPath,
}: SidebarNavigationProps) {
  return (
    <nav className="flex flex-col gap-2 w-full">
      {links.map((link) => {
        const Icon = getIcon(link.iconName);
        const isActive = isPathActive(currentPath, link.href);

        return (
          <Link key={link.id} href={link.href}>
            <button
              className={cn(
                SIDEBAR_STYLES.NAV_ITEM,
                "flex items-center gap-3",
                isActive
                  ? SIDEBAR_STYLES.NAV_ITEM_ACTIVE
                  : SIDEBAR_STYLES.NAV_ITEM_INACTIVE
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />
              <span className="font-medium">{link.label}</span>
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
