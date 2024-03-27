/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsQueueService } from 'src/transactions-queue/transactions-queue.service';
import { TransferInterface } from './interfaces/transfer.interface';
import { TransfersService } from './transfers.service';

@ApiTags('Transfers')
@Controller('transfers')
export class TransfersController {
  constructor(
    private transactionsQueueService: TransactionsQueueService,
    private readonly trasnfersService: TransfersService,
  ) {}

  @Post()
  async create(
    @Body() createTransferDto: CreateTransferDto,
  ): Promise<{ message: string }> {
    await this.transactionsQueueService.setTransactionsQueue({
      transcationType: 'transfer',
      ...createTransferDto,
    });
    return { message: 'A transação foi adicionada a fila de operações' };
  }

  @Get()
  async findAll(): Promise<TransferInterface[]> {
    return this.trasnfersService.findAll();
  }

  @Get(':id')
  async find(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransferInterface> {
    return this.trasnfersService.find(+id);
  }
}
