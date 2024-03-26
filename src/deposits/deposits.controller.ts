/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @ApiTags('Deposits')
  @Post()
  async create(@Body() createDepositDto: CreateDepositDto) {
    return await this.depositsService.create(createDepositDto);
  }

}
