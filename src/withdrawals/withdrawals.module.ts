/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { PrismaClient } from '@prisma/client';
import { TransactionsQueueModule } from 'src/transactions-queue/transactions-queue.module';

@Module({
  imports: [forwardRef(() => TransactionsQueueModule)],
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService, PrismaClient],
  exports: [WithdrawalsService]
})
export class WithdrawalsModule {}
