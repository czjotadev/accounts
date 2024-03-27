/* eslint-disable prettier/prettier */
export interface TransactionsQueueInterface {
  transcationType: string;
  ammount: number;
  originAccountNumber?: number;
  targetAccountNumber?: number;
  accountNumber?: number;
}
