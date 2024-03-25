/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaClient],
})
export class AccountsModule {}
