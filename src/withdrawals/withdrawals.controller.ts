/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawInterface } from './interfaces/withdraw.interface';

@ApiTags('Withdrawals')
@Controller('withdrawals')
export class WithdrawalsController {
  constructor(
    private transactionsQueueService: TransactionsQueueService,
    private readonly withdrawalsService: WithdrawalsService,
  ) {}

  @Post()
  async create(@Body() createWithdrawalDto: CreateWithdrawalDto) {
    await this.transactionsQueueService.setTransactionsQueue({
      transcationType: 'withdraw',
      ...createWithdrawalDto,
    });
    return { message: 'A transação foi adicionada a fila de operações' };
  }

  @Get()
  async findAll(): Promise<WithdrawInterface[]> {
    return this.withdrawalsService.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<WithdrawInterface> {
    return this.withdrawalsService.find(+id);
  }
}
