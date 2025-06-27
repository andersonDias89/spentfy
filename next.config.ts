import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Medidas de segurança recomendadas para Next.js
  // 1. Headers HTTP seguros
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; img-src * data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none';",
        },
        {
          key: "Permissions-Policy",
          value: "geolocation=(), microphone=(), camera=()",
        },
      ],
    },
  ],
  // 2. Ativar React Strict Mode
  reactStrictMode: true,
  // 3. Ativar SWC minify para evitar vazamento de código

  // 4. Forçar HTTPS (se estiver atrás de proxy, configure no proxy também)
  // 5. Desabilitar diretórios públicos desnecessários
  // 6. Outras opções de segurança podem ser adicionadas conforme necessidade
};

export default nextConfig;
