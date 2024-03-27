/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountInterface } from './interfaces/account.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountInterface> {
    return await this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<AccountInterface[]> {
    return await this.accountsService.findAll()
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<AccountInterface> {
    return await this.accountsService.find(+id)
  }
}
