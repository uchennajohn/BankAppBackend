import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { TransactionService } from './transaction.service';
//import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';
import { WithdrawTransactionDto } from './dto/withdraw-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  

  @UseGuards(JwtAuthGuard)
@Post('/deposit/:userId')
async deposit(@Body() depositTransactionDto: DepositTransactionDto, @Param('userId') userId: string) {
  return this.transactionService.deposit(depositTransactionDto, userId);
}

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw/:userId')
  async withdraw(@Body() withdrawTransactionDto: WithdrawTransactionDto, @Param('userId') userId: string) {
    return this.transactionService.withdraw(withdrawTransactionDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/history/:userId')
  async getTransactionHistory(@Param('userId') userId: string) {
    return this.transactionService.getTransactionHistory(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/balance/:userId')
  async getAccountBalance(@Param('userId') userId: string) {
    return this.transactionService.getAccountBalance(userId);
  }
}

