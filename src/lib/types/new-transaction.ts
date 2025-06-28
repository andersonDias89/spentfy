import { TransactionType } from "./transaction";

export interface CreateTransaction {
  title: string;
  amount: number;
  type: TransactionType;
  date: string | Date;
  userId: string;
}
