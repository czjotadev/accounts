/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TransactionsQueueService {
  constructor(
    @InjectQueue('TransactionsQueue') private readonly transactionsQueue: Queue,
  ) {}

  async setTransactionsQueue(data: any): Promise<void> {
    await this.transactionsQueue.add(data);
  }
}