/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { PrismaClient } from '@prisma/client';
import { TransactionsQueueModule } from 'src/transactions-queue/transactions-queue.module';

@Module({
  imports: [forwardRef(() => TransactionsQueueModule)],
  controllers: [TransfersController],
  providers: [TransfersService, PrismaClient],
  exports: [TransfersService]
})
export class TransfersModule {}
