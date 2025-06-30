"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { SIDEBAR_CONFIG } from "./constants";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setTimeout(() => setIsHovering(true), SIDEBAR_CONFIG.HOVER_DELAY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleCreateTransaction = useCallback(() => {
    router.push(ROUTES.NEW_TRANSACTION);
  }, [router]);

  return {
    isOpen,
    isHovering,
    currentPath: pathname,
    toggleSidebar,
    handleMouseEnter,
    handleMouseLeave,
    handleCreateTransaction,
  };
}
