import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { DepositsModule } from './deposits/deposits.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { TransfersModule } from './transfers/transfers.module';
import { TransactionsQueueModule } from './transactions-queue/transactions-queue.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    AccountsModule,
    DepositsModule,
    WithdrawalsModule,
    TransfersModule,
    TransactionsQueueModule,
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379 },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
