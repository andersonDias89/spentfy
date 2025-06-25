import { User } from "./user";

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
  user?: User;
}
