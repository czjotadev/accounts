import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';

@Module({
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService],
})
export class WithdrawalsModule {}
