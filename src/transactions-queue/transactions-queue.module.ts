/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TransactionsQueueService } from './transactions-queue.service';
import { BullModule } from '@nestjs/bull';
import { TransactionQueueConsumer } from './transactions-queue.consumer';
import { DepositsModule } from 'src/deposits/deposits.module';
import { WithdrawalsModule } from 'src/withdrawals/withdrawals.module';
import { TransfersModule } from 'src/transfers/transfers.module';

@Module({
  imports: [
    forwardRef(() => DepositsModule),
    forwardRef(() => WithdrawalsModule),
    forwardRef(() => TransfersModule),
    BullModule.registerQueueAsync({
      name: 'TransactionsQueue',
    }),
  ],
  providers: [TransactionsQueueService, TransactionQueueConsumer],
  exports: [TransactionsQueueService, BullModule],
})
export class TransactionsQueueModule {}
