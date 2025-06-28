import { User } from "./user";

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
}

// Tipo para transações vindas da API (com strings de data)
export interface TransactionResponse {
  id: string;
  title: string;
  amount: string | number;
  type: TransactionType;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
