"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { UserAvatarProps } from "./types";
import { HEADER_CONFIG, HEADER_STYLES } from "./constants";
import { getUserInitials, getAvatarUrl, getDisplayName } from "./utils";

export default function UserAvatar({
  user,
  isOpen,
  onToggle,
}: UserAvatarProps) {
  const avatarUrl = getAvatarUrl(user);
  const initials = getUserInitials(user);
  const displayName = getDisplayName(user);

  return (
    <button
      onClick={onToggle}
      className={HEADER_STYLES.AVATAR_BUTTON}
      aria-label="Menu do usuário"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <div className="relative">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={HEADER_CONFIG.AVATAR_SIZE}
            height={HEADER_CONFIG.AVATAR_SIZE}
            className={HEADER_STYLES.AVATAR_IMAGE}
            priority
          />
        ) : (
          <div className={`${HEADER_STYLES.AVATAR_FALLBACK} w-9 h-9`}>
            {initials}
          </div>
        )}

        {/* Indicador online */}
        <div className={HEADER_STYLES.ONLINE_INDICATOR} />
      </div>

      <div className="flex flex-col items-start ml-2">
        <span className="text-sm font-medium text-white truncate max-w-32">
          {displayName}
        </span>
        {user?.email && (
          <span className="text-xs text-zinc-400 truncate max-w-32">
            {user.email}
          </span>
        )}
      </div>

      <ChevronDown
        size={16}
        className={`text-zinc-400 transition-transform ${
          HEADER_CONFIG.ANIMATION_DURATION
        } ${isOpen ? "rotate-180" : "rotate-0"}`}
      />
    </button>
  );
}
