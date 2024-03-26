/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';

@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private transactionsQueueService: TransactionsQueueService) {}

  @ApiTags('Withdrawals')
  @Post()
  async create(@Body() createWithdrawalDto: CreateWithdrawalDto) {
    await this.transactionsQueueService.setTransactionsQueue({
      transcationType: 'transfer',
      ...createWithdrawalDto,
    });
    return { message: 'A transação foi adicionada a fila de operações' }
  }
}
