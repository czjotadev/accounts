/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService, PrismaClient],
})
export class WithdrawalsModule {}
