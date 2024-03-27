/* eslint-disable prettier/prettier */
export interface DepositInterface {
  id: number;
  accountNumber: number;
  ammount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
