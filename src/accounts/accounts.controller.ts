/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountInterface } from './interfaces/account.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @ApiTags('Accounts')
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountInterface> {
    return await this.accountsService.create(createAccountDto);
  }
}
