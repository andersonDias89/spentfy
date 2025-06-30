export const HEADER_CONFIG = {
  HEIGHT: "h-16",
  AVATAR_SIZE: 36,
  DROPDOWN_WIDTH: "w-64",
  ANIMATION_DURATION: "duration-200",
} as const;

export const HEADER_STYLES = {
  BASE: "bg-zinc-900 border-b border-zinc-800 shadow-lg",
  CONTAINER: "h-16 px-6 flex items-center justify-between",
  TITLE: "text-xl font-bold text-white",
  USER_SECTION: "flex items-center gap-3",
  AVATAR_BUTTON:
    "relative flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer",
  AVATAR_IMAGE:
    "rounded-full border-2 border-zinc-700 hover:border-green-500 transition-colors",
  AVATAR_FALLBACK:
    "bg-green-600 text-white rounded-full flex items-center justify-center font-semibold",
  DROPDOWN:
    "absolute top-full right-0 mt-2 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 z-50",
  DROPDOWN_ITEM:
    "w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors text-zinc-300 hover:text-white",
  DROPDOWN_SEPARATOR: "border-t border-zinc-700 my-1",
  ONLINE_INDICATOR:
    "absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900",
} as const;

export const HEADER_CONTENT = {
  APP_NAME: "Spentfy",
  AVATAR_ALT: "Avatar do usuário",
  DROPDOWN_ITEMS: [
    { id: "profile", label: "Perfil", action: "profile" as const },
    { id: "settings", label: "Configurações", action: "settings" as const },
    { id: "divider", type: "divider" as const },
    {
      id: "logout",
      label: "Sair",
      action: "logout" as const,
      variant: "danger" as const,
    },
  ] as const,
} as const;
