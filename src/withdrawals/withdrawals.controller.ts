/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @ApiTags('Withdrawals')
  @Post()
  create(@Body() createWithdrawalDto: CreateWithdrawalDto) {
    return this.withdrawalsService.create(createWithdrawalDto);
  }
}
