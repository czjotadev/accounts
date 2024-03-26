/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';

@Controller('deposits')
export class DepositsController {
  constructor(private transactionsQueueService: TransactionsQueueService) {}

  @ApiTags('Deposits')
  @Post()
  async create(@Body() createDepositDto: CreateDepositDto): Promise<{ message: string}> {
    await this.transactionsQueueService.setTransactionsQueue({
      transcationType: 'deposit',
      ...createDepositDto,
    });
    return { message: 'A transação foi adicionada a fila de operações' };
  }
}
