/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TransactionsQueueInterface } from './interfaces/transactions-queue.interface';
import { DepositsService } from 'src/deposits/deposits.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { WithdrawalsService } from 'src/withdrawals/withdrawals.service';

@Processor('TransactionsQueue')
export class TransactionQueueConsumer {
  constructor(
    private readonly depositsService: DepositsService,
    private readonly transfersService: TransfersService,
    private readonly withdrawalsService: WithdrawalsService,
  ) {}

  private logger = new Logger(TransactionQueueConsumer.name);

  @Process()
  async executeTransaction(job: Job<TransactionsQueueInterface>) {
    try {
      const {
        transcationType,
        originAccountNumber,
        targetAccountNumber,
        accountNumber,
        ammount,
      } = job.data;

      switch (transcationType) {
        case 'transfer':
          const transfer = await this.transfersService.create({
            originAccountNumber,
            targetAccountNumber,
            ammount,
          });
          this.logger.log(transfer);
          break;
        case 'deposit':
          const deposit = await this.depositsService.create({
            accountNumber,
            ammount,
          });
          this.logger.log(deposit);
          break;
        case 'withdraw':
          const withdraw = await this.withdrawalsService.create({
            accountNumber,
            ammount,
          });
          this.logger.log(withdraw);
          break;
        default:
          this.logger.log('Transação não identificada.');
      }

    } catch (error) {
      this.logger.log(`Erro ao realizar transação: ${error.message}`);
    }
  }
}
