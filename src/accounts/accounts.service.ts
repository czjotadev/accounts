/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaClient } from '@prisma/client';
import { AccountInterface } from './interfaces/account.interface';

@Injectable()
export class AccountsService {
  constructor(private prismaClient: PrismaClient) {}
  async create(createAccountDto: CreateAccountDto): Promise<AccountInterface> {
    try {
      const { accountNumber, balance } = createAccountDto;

      const verifyAccountExists = await this.prismaClient.account.findFirst({
        where: {
          accountNumber,
        },
      });

      if (verifyAccountExists)
        throw new Error(
          `Já existe uma conta registrada com o número informado: ${accountNumber}`,
        );

      const account = await this.prismaClient.account.create({
        data: {
          accountNumber,
          balance: balance ? balance : 0,
        },
      });

      return account;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(id: number): Promise<AccountInterface> {
    try {
      return await this.prismaClient.account.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<AccountInterface[]> {
    try {
      return await this.prismaClient.account.findMany();
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
