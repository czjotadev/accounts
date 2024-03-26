/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { PrismaClient } from '@prisma/client';
import { TransactionsQueueModule } from 'src/transactions-queue/transactions-queue.module';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';

@Module({
  imports: [TransactionsQueueModule],
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService, PrismaClient, TransactionsQueueService],
})
export class WithdrawalsModule {}
