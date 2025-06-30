import {
  LayoutDashboard,
  TrendingUp,
  Plus,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { IconName } from "./types";

/**
 * Mapeamento de nomes de ícones para componentes Lucide
 */
const ICON_MAP: Record<IconName, LucideIcon> = {
  dashboard: LayoutDashboard,
  transactions: TrendingUp,
  plus: Plus,
  menu: Menu,
  x: X,
};

/**
 * Obtém o componente de ícone baseado no nome
 */
export function getIcon(iconName: IconName): LucideIcon {
  return ICON_MAP[iconName];
}

/**
 * Verifica se um caminho está ativo baseado na rota atual
 */
export function isPathActive(currentPath: string, linkPath: string): boolean {
  // Rota exata
  if (currentPath === linkPath) {
    return true;
  }

  // Subrota (exceto para a home)
  if (linkPath !== "/" && currentPath.startsWith(linkPath)) {
    return true;
  }

  return false;
}

/**
 * Combina classes CSS do Tailwind de forma condicional
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
