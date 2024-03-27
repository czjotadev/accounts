/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';
import { DepositInterface } from './interfaces/deposit.interface';
import { DepositsService } from './deposits.service';

@ApiTags('Deposits')
@Controller('deposits')
export class DepositsController {
  constructor(private transactionsQueueService: TransactionsQueueService, private despositsService: DepositsService) {}

  @Post()
  async create(@Body() createDepositDto: CreateDepositDto): Promise<{ message: string}> {
    await this.transactionsQueueService.setTransactionsQueue({
      transcationType: 'deposit',
      ...createDepositDto,
    });
    return { message: 'A transação foi adicionada a fila de operações' };
  }

  @Get()
  async findAll(): Promise<DepositInterface[]> {
    return await this.despositsService.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<DepositInterface> {
    return await this.despositsService.find(+id);
  }
}
