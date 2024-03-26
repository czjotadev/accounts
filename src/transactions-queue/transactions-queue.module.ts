/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionsQueueService } from './transactions-queue.service';
import { BullModule } from '@nestjs/bull';
import { TransactionQueueConsumer } from './transactions-queue.consumer';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'TransactionsQueue',
    }),
  ],
  providers: [TransactionsQueueService, TransactionQueueConsumer],
  exports: [TransactionsQueueService, BullModule]
})
export class TransactionsQueueModule {}
