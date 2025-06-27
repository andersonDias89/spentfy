"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0, // Não revalidar automaticamente
        revalidateOnFocus: false, // Não revalidar quando a janela ganha foco
        revalidateOnReconnect: true, // Revalidar quando reconectar à internet
        dedupingInterval: 60000, // 1 minuto para evitar requisições duplicadas
        errorRetryCount: 3, // Tentar 3 vezes em caso de erro
        errorRetryInterval: 5000, // Esperar 5 segundos entre tentativas
        shouldRetryOnError: (error) => {
          // Não tentar novamente para erros 404
          if (error?.status === 404) return false;
          return true;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
