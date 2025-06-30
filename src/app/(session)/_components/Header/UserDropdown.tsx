"use client";

import { User, Settings, LogOut } from "lucide-react";
import { UserDropdownProps } from "./types";
import { HEADER_CONFIG, HEADER_STYLES, HEADER_CONTENT } from "./constants";

const iconMap = {
  profile: User,
  settings: Settings,
  logout: LogOut,
};

export default function UserDropdown({
  user,
  isOpen,
  onClose,
  onAction,
}: UserDropdownProps) {
  if (!isOpen) return null;

  const handleAction = (action: string) => {
    onAction(action);
    onClose();
  };

  return (
    <div
      className={`${HEADER_STYLES.DROPDOWN} ${HEADER_CONFIG.DROPDOWN_WIDTH}`}
      role="menu"
      aria-orientation="vertical"
    >
      {/* Header do dropdown */}
      <div className="px-4 py-3 border-b border-zinc-700">
        <p className="text-sm font-medium text-white">
          {user?.name || "Usuário"}
        </p>
        <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
      </div>

      {/* Items do menu */}
      <div className="py-1">
        {HEADER_CONTENT.DROPDOWN_ITEMS.map((item) => {
          if ("type" in item && item.type === "divider") {
            return (
              <div key={item.id} className={HEADER_STYLES.DROPDOWN_SEPARATOR} />
            );
          }

          if ("action" in item) {
            const Icon = iconMap[item.action as keyof typeof iconMap];
            const isDanger = "variant" in item && item.variant === "danger";

            return (
              <button
                key={item.id}
                onClick={() => handleAction(item.action)}
                className={`
                  ${HEADER_STYLES.DROPDOWN_ITEM}
                  flex items-center gap-3
                  ${
                    isDanger
                      ? "text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      : ""
                  }
                `}
                role="menuitem"
              >
                {Icon && <Icon size={16} />}
                <span className="text-sm">{item.label}</span>
              </button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
