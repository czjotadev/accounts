/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { PrismaClient } from '@prisma/client';
import { TransactionsQueueModule } from 'src/transactions-queue/transactions-queue.module';

@Module({
  imports: [TransactionsQueueModule],
  controllers: [DepositsController],
  providers: [DepositsService, PrismaClient],
  exports: [DepositsService]
})
export class DepositsModule {}
