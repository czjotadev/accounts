/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { PrismaClient } from '@prisma/client';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';
import { TransactionsQueueModule } from 'src/transactions-queue/transactions-queue.module';

@Module({
  imports: [TransactionsQueueModule],
  controllers: [TransfersController],
  providers: [TransfersService, PrismaClient, TransactionsQueueService],
})
export class TransfersModule {}
