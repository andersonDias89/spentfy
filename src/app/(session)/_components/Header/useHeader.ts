"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

export function useHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleDropdownAction = useCallback(
    async (action: string) => {
      switch (action) {
        case "profile":
          // TODO: Implementar navegação para perfil
          console.log("Navegando para perfil...");
          break;
        case "settings":
          // TODO: Implementar navegação para configurações
          console.log("Navegando para configurações...");
          break;
        case "logout":
          await signOut({ callbackUrl: "/" });
          break;
        default:
          console.log("Ação não reconhecida:", action);
      }
      closeDropdown();
    },
    [closeDropdown]
  );

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen, closeDropdown]);

  // Fechar dropdown com ESC
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isDropdownOpen, closeDropdown]);

  return {
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    handleDropdownAction,
  };
}
