"use client";

import { HeaderUserSectionProps } from "./types";
import { useHeader } from "./useHeader";
import UserAvatar from "./UserAvatar";
import UserDropdown from "./UserDropdown";

export default function HeaderUserSection({ user }: HeaderUserSectionProps) {
  const {
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    handleDropdownAction,
  } = useHeader();

  // Wrapper para conectar o dropdown ao hook
  const handleDropdownClose = () => {
    closeDropdown();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <UserAvatar
        user={user}
        isOpen={isDropdownOpen}
        onToggle={toggleDropdown}
      />

      <UserDropdown
        user={user}
        isOpen={isDropdownOpen}
        onClose={handleDropdownClose}
        onAction={handleDropdownAction}
      />
    </div>
  );
}
