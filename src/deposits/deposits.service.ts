/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DepositsService {
  constructor(
    private prismaClient: PrismaClient,
  ) {}
  async create(createDepositDto: CreateDepositDto) {
    try {
      const { accountNumber, ammount } = createDepositDto;

      const verifyAccount = await this.prismaClient.account.findFirstOrThrow({
        where: { accountNumber },
      });

      const deposit = await this.prismaClient.deposit.create({
        data: {
          accountNumber,
          ammount,
        },
      });

      const account = await this.prismaClient.account.update({
        where: { accountNumber },
        data: {
          balance: verifyAccount.balance + ammount,
        },
      });

      return { account, deposit };
    } catch (error) {
      throw new HttpException(
        {
          message:
            'Não foi possível realizar o depósito. Verifique o número da conta.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
