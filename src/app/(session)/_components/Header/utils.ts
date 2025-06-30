import { User } from "next-auth";

/**
 * Extrai as iniciais do nome do usuário para o avatar fallback
 */
export function getUserInitials(user: User | null): string {
  if (!user?.name) return "U";

  const names = user.name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }

  return names[0][0].toUpperCase();
}

/**
 * Gera uma URL de avatar padrão caso não tenha imagem
 */
export function getAvatarUrl(user: User | null): string | null {
  if (user?.image) return user.image;
  return null;
}

/**
 * Obtém o nome de exibição do usuário
 */
export function getDisplayName(user: User | null): string {
  if (user?.name) return user.name;
  if (user?.email) return user.email.split("@")[0];
  return "Usuário";
}

/**
 * Combina classes CSS do Tailwind de forma condicional
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
