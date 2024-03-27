/* eslint-disable prettier/prettier */
export interface TransferInterface {
  id: number;
  originAccountNumber: number;
  targetAccountNumber: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
