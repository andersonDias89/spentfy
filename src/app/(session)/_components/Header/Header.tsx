"use client";

import { useSession } from "next-auth/react";
import { HeaderProps } from "./types";
import { HEADER_STYLES, HEADER_CONTENT } from "./constants";
import HeaderUserSection from "./HeaderUserSection";

export default function Header({ className = "" }: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user || null;

  return (
    <header className={`${HEADER_STYLES.BASE} ${className}`}>
      <div className={HEADER_STYLES.CONTAINER}>
        {/* Logo/Título */}
        <div className="flex items-center gap-3">
          <h1 className={HEADER_STYLES.TITLE}>{HEADER_CONTENT.APP_NAME}</h1>
        </div>

        {/* Seção do usuário */}
        <div className={HEADER_STYLES.USER_SECTION}>
          <HeaderUserSection user={user} />
        </div>
      </div>
    </header>
  );
}
