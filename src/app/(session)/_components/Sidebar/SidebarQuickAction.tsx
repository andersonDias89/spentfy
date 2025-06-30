"use client";

import { SidebarQuickActionProps } from "./types";
import { SIDEBAR_STYLES } from "./constants";
import { getIcon } from "./utils";

export default function SidebarQuickAction({
  onCreateTransaction,
}: SidebarQuickActionProps) {
  const PlusIcon = getIcon("plus");

  return (
    <button
      onClick={onCreateTransaction}
      className={SIDEBAR_STYLES.QUICK_ACTION}
      aria-label="Criar nova transação"
      title="Criar nova transação"
    >
      <PlusIcon className="text-white" size={20} />
    </button>
  );
}
