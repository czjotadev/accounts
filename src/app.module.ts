import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { DepositsModule } from './deposits/deposits.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [AccountsModule, DepositsModule, WithdrawalsModule, TransfersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
