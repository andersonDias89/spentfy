// Application constants
export const APP_CONFIG = {
  name: "Spentfy",
  description: "Sistema de finanças pessoais",
  version: "1.0.0",
} as const;

export const TRANSACTION_TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const;

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/movimentacao",
  NEW_TRANSACTION: "/movimentacao/new",
} as const;

export const CACHE_CONFIG = {
  DEDUPING_INTERVAL: 2000,
  ERROR_RETRY_COUNT: 3,
  ERROR_RETRY_INTERVAL: 5000,
} as const;

export const UI_CONFIG = {
  LOADING_DELAY: 300,
  TOAST_DURATION: 3000,
} as const;
