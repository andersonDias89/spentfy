import { User as NextAuthUser } from "next-auth";

export interface HeaderProps {
  className?: string;
}

export interface UserAvatarProps {
  user: NextAuthUser | null;
  isOpen: boolean;
  onToggle: () => void;
}

export interface UserDropdownProps {
  user: NextAuthUser | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

export interface HeaderUserSectionProps {
  user: NextAuthUser | null;
}
