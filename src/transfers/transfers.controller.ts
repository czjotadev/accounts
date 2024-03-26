/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transactionsQueueService: TransactionsQueueService) {}

  @ApiTags('Transfers')
  @Post()
  async create(@Body() createTransferDto: CreateTransferDto): Promise<{ message: string}> {
    await this.transactionsQueueService.setTransactionsQueue({
      transcationType: 'transfer',
      ...createTransferDto,
    });
    return { message: 'A transação foi adicionada a fila de operações' }
  }
}
