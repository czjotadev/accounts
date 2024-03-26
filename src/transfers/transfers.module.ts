import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TransfersController],
  providers: [TransfersService, PrismaClient],
})
export class TransfersModule {}
