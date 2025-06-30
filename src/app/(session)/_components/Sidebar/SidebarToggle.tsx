"use client";

import { SidebarToggleProps } from "./types";
import { SIDEBAR_STYLES } from "./constants";
import { getIcon } from "./utils";

export default function SidebarToggle({
  isOpen,
  isHovering,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: SidebarToggleProps) {
  const renderIcon = () => {
    if (isOpen || isHovering) {
      const XIcon = getIcon("x");
      return (
        <XIcon className="w-6 h-6 text-zinc-300 hover:text-white transition-colors" />
      );
    }
    const MenuIcon = getIcon("menu");
    return (
      <MenuIcon className="w-6 h-6 text-zinc-300 hover:text-white transition-colors" />
    );
  };

  return (
    <div
      className={SIDEBAR_STYLES.TOGGLE_BUTTON}
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? "Fechar sidebar" : "Abrir sidebar"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {renderIcon()}
    </div>
  );
}
