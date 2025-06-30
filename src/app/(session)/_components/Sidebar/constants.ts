import { SidebarLink } from "./types";
import { ROUTES } from "@/lib/constants";

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    iconName: "dashboard",
  },
  {
    id: "transactions",
    label: "Movimentações",
    href: ROUTES.TRANSACTIONS,
    iconName: "transactions",
  },
] as const;

export const SIDEBAR_CONFIG = {
  EXPANDED_WIDTH: "w-64",
  COLLAPSED_WIDTH: "w-16",
  ANIMATION_DURATION: "duration-300",
  HOVER_DELAY: 100,
  // Responsividade
  MOBILE_BREAKPOINT: 768, // px
  MOBILE_EXPANDED_WIDTH: "w-full",
} as const;

export const SIDEBAR_STYLES = {
  BASE: "bg-zinc-800 h-full flex flex-col items-center transition-all relative",
  EXPANDED_CONTENT: "bg-zinc-900 text-white transition-all overflow-hidden",
  TOGGLE_BUTTON:
    "mb-6 cursor-pointer p-2 rounded-lg hover:bg-zinc-700 transition-colors",
  QUICK_ACTION:
    "bg-green-600 hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded-full transition-colors shadow-lg",
  NAV_ITEM:
    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-zinc-800",
  NAV_ITEM_ACTIVE: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
  NAV_ITEM_INACTIVE: "text-zinc-300 hover:text-white",
  // Overlay para mobile quando sidebar está aberto
  MOBILE_OVERLAY: "fixed inset-0 bg-black/50 z-40 md:hidden",
} as const;
