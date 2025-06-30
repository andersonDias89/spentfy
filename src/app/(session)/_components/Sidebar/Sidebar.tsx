"use client";

import { SidebarProps } from "./types";
import { SIDEBAR_CONFIG, SIDEBAR_STYLES } from "./constants";
import { useSidebar } from "./useSidebar";
import SidebarToggle from "./SidebarToggle";
import SidebarNavigation from "./SidebarNavigation";
import SidebarCollapsedNavigation from "./SidebarCollapsedNavigation";

export default function Sidebar({ links, className = "" }: SidebarProps) {
  const {
    isOpen,
    isHovering,
    currentPath,
    toggleSidebar,
    handleMouseEnter,
    handleMouseLeave,
    handleCreateTransaction,
  } = useSidebar();

  return (
    <div
      className={`flex ${className}`}
      role="navigation"
      aria-label="Navegação principal"
    >
      {/* Sidebar Lateral */}
      <div
        className={`
          ${SIDEBAR_STYLES.BASE} 
          ${SIDEBAR_CONFIG.ANIMATION_DURATION} 
          ${SIDEBAR_CONFIG.COLLAPSED_WIDTH} 
          p-4
        `}
      >
        <SidebarToggle
          isOpen={isOpen}
          isHovering={isHovering}
          onToggle={toggleSidebar}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {!isOpen && (
          <SidebarCollapsedNavigation links={links} currentPath={currentPath} />
        )}
      </div>

      {/* Conteúdo Expandido */}
      <div
        className={`
          ${SIDEBAR_STYLES.EXPANDED_CONTENT} 
          ${SIDEBAR_CONFIG.ANIMATION_DURATION}
          ${isOpen ? `${SIDEBAR_CONFIG.EXPANDED_WIDTH} p-6` : "w-0 p-0"}
        `}
      >
        {isOpen && (
          <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-zinc-700 pb-4">
              <h2 className="font-bold text-lg text-white">Menu</h2>
              <p className="text-sm text-zinc-400 mt-1">Navegue pelo sistema</p>
            </div>

            {/* Ação Rápida Expandida */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 shadow-lg">
              <h3 className="font-bold text-sm text-white mb-2">
                Nova Movimentação
              </h3>
              <p className="text-sm text-green-100 mb-3">
                Registre suas receitas e despesas
              </p>
              <button
                onClick={handleCreateTransaction}
                className="w-full bg-white text-green-700 hover:bg-green-50 transition-colors font-bold py-2 px-4 rounded-lg text-sm"
              >
                Criar Movimentação
              </button>
            </div>

            {/* Navegação */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-zinc-400 mb-3 uppercase tracking-wider">
                Navegação
              </h3>
              <SidebarNavigation links={links} currentPath={currentPath} />
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-700 pt-4">
              <p className="text-xs text-zinc-500 text-center">
                Spentfy v1.0.0
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
