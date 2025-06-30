export type IconName = "dashboard" | "transactions" | "plus" | "menu" | "x";

export interface SidebarLink {
  id: string;
  label: string;
  href: string;
  iconName: IconName;
}

export interface SidebarProps {
  links: SidebarLink[];
  className?: string;
}

export interface SidebarToggleProps {
  isOpen: boolean;
  isHovering: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface SidebarNavigationProps {
  links: SidebarLink[];
  currentPath: string;
}

export interface SidebarQuickActionProps {
  onCreateTransaction: () => void;
}
