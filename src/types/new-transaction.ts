export type TransactionType = "INCOME" | "EXPENSE";

export interface CreateTransaction {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string | Date;
  userId: string;
}
