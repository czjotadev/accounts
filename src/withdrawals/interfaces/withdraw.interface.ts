/* eslint-disable prettier/prettier */
export interface WithdrawInterface {
  id: number;
  accountNumber: number;
  ammount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
