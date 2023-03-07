import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schema/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';
import { WithdrawTransactionDto } from './dto/withdraw-transaction.dto';
import { User, UserDocument } from 'src/auth/schema/user.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,

    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  //handling Deposit
  async deposit(
    depositTransactionDto: DepositTransactionDto,
    userId: string,
  ): Promise<{
    transaction: Transaction;
    balance: number;
    depositorName: string;
    
  }> {
    const { amount, depositorName  } = depositTransactionDto;

    // Check if user with the given userId exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException(`User with id ${userId} does not exist`);
    }

    // Create and save the transaction document
    const transaction = new this.transactionModel({
      amount,
      type: 'deposit',
      userId,
      depositorName: depositorName,
    });
    await transaction.save();

    // Update the user's account balance
    user.accountBalance += amount;
    await user.save();

    // Return the transaction and the updated balance
    return {
      transaction,
      balance: user.accountBalance,
      depositorName: depositorName,
      
    };
  }

  //handling Withdrawal
  async withdraw(
    withdrawTransactionDto: WithdrawTransactionDto,
    userId: string,
  ): Promise<{ transaction: Transaction; balance: number }> {
    const { amount } = withdrawTransactionDto;

    // Check if user with the given userId exists
    const existingUser = await this.userModel.findById(userId);
    if (!existingUser) {
      throw new UnauthorizedException(`User with id ${userId} does not exist`);
    }

    // Check if withdrawal amount is greater than account balance
    if (amount > existingUser.accountBalance) {
      throw new BadRequestException(
        'Withdrawal amount is greater than account balance',
      );
    }

    // Create and save the transaction document
    const transaction = new this.transactionModel({
      amount: -amount,
      type: 'withdrawal',
      userId,
    });
    await transaction.save();

    // Update the user's account balance
    existingUser.accountBalance -= amount;
    await existingUser.save();

    // Return the transaction and the updated balance
    return { transaction, balance: existingUser.accountBalance };
  }

  //Getting Transaction History
  async getTransactionHistory(userId: string) {
    const transactions = await this.transactionModel.find({ userId }).exec();
    let accountBalance = 0;

    const transactionHistory = transactions.map((transaction) => {
      accountBalance += transaction.amount;
      return {
        transaction,
        balance: accountBalance,
        
      };
    });

    return transactionHistory;
  }

  //Gettting Current Account Balance
  async getAccountBalance(userId: string): Promise<number> {
    const transactions = await this.transactionModel.find({ userId }).exec();

    // Calculate the account balance
    let accountBalance = transactions.reduce(
      (balance, transaction) => balance + transaction.amount,
      0,
    );

    // Return the updated account balance
    return accountBalance;
  }
}
