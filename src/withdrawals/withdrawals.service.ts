/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { PrismaClient } from '@prisma/client';
import { WithdrawInterface } from './interfaces/withdraw.interface';

@Injectable()
export class WithdrawalsService {
  constructor(private prismaClient: PrismaClient) {}
  async create(createWithdrawalDto: CreateWithdrawalDto) {
    try {
      const { accountNumber, ammount } = createWithdrawalDto;

      const verifyAccount = await this.prismaClient.account.findFirstOrThrow({
        where: { accountNumber },
      });

      if (verifyAccount.balance < ammount) throw new Error();

      const account = await this.prismaClient.account.update({
        where: { accountNumber },
        data: {
          balance: verifyAccount.balance - ammount,
        },
      });

      const withdrawal = await this.prismaClient.withdraw.create({
        data: { accountNumber, ammount },
      });

      return { account, withdrawal };
    } catch (error) {
      throw new HttpException(
        {
          message:
            'Não foi possível realizar o Saque. Verifique o saldo e o número da conta.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<WithdrawInterface[]> {
    try {
      return await this.prismaClient.withdraw.findMany();
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async find(id: number): Promise<WithdrawInterface> {
    try {
      return await this.prismaClient.withdraw.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
