/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('TransactionsQueue')
export class TransactionQueueConsumer {
  private logger = new Logger(TransactionQueueConsumer.name);
  @Process()
  async teste(job: Job<unknown>) {
    this.logger.log(JSON.stringify(job.data));
  }
}
