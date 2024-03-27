/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { PrismaClient } from '@prisma/client';
import { TransferInterface } from './interfaces/transfer.interface';

@Injectable()
export class TransfersService {
  constructor(private prismaClient: PrismaClient) {}
  async create(createTransferDto: CreateTransferDto) {
    try {
      const { originAccountNumber, targetAccountNumber, ammount } =
        createTransferDto;

      if (originAccountNumber === targetAccountNumber)
        throw new Error(
          'Os números das contas para realizar a transferia devem ser diferentes.',
        );

      const existsOriginAccountNumber =
        await this.prismaClient.account.findFirstOrThrow({
          where: {
            accountNumber: originAccountNumber,
          },
        });

      const existsTargetAccountNumber =
        await this.prismaClient.account.findFirstOrThrow({
          where: {
            accountNumber: targetAccountNumber,
          },
        });

      if (existsOriginAccountNumber.balance < ammount)
        throw new Error('Saldo insuficiente para realizar a transferencia.');

      const transfer = await this.prismaClient.transfer.create({
        data: {
          ammount,
          originAccountNumber: existsOriginAccountNumber.accountNumber,
          targetAccountNumber: existsTargetAccountNumber.accountNumber,
        },
      });

      const originAccount = await this.prismaClient.account.update({
        where: {
          accountNumber: existsOriginAccountNumber.accountNumber,
        },
        data: {
          balance: existsOriginAccountNumber.balance - ammount,
        },
      });

      const targetAccount = await this.prismaClient.account.update({
        where: {
          accountNumber: existsTargetAccountNumber.accountNumber,
        },
        data: {
          balance: existsTargetAccountNumber.balance + ammount,
        },
      });

      return { transfer, originAccount, targetAccount };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<TransferInterface[]> {
    try {
      return await this.prismaClient.transfer.findMany();
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async find(id: number): Promise<TransferInterface> {
    try {
      return await this.prismaClient.transfer.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
