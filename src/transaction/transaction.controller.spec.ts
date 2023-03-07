import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';
import { WithdrawTransactionDto } from './dto/withdraw-transaction.dto';

describe('TransactionController', () => {
  let controller: TransactionController;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deposit', () => {
    it('should call transactionService.deposit with correct arguments', async () => {
      const depositTransactionDto: DepositTransactionDto = {
          amount: 100,
          userId: '',
          depositorName: ''
      };
      const userId = '123';

      const spy = jest.spyOn(transactionService, 'deposit').mockResolvedValue(null);

      await controller.deposit(depositTransactionDto, userId);

      expect(spy).toHaveBeenCalledWith(depositTransactionDto, userId);
    });
  });

  describe('withdraw', () => {
    it('should call transactionService.withdraw with correct arguments', async () => {
      const withdrawTransactionDto: WithdrawTransactionDto = {
          amount: 50,
          userId: ''
      };
      const userId = '123';

      const spy = jest.spyOn(transactionService, 'withdraw').mockResolvedValue(null);

      await controller.withdraw(withdrawTransactionDto, userId);

      expect(spy).toHaveBeenCalledWith(withdrawTransactionDto, userId);
    });
  });

  describe('getTransactionHistory', () => {
    it('should call transactionService.getTransactionHistory with correct arguments', async () => {
      const userId = '123';

      const spy = jest.spyOn(transactionService, 'getTransactionHistory').mockResolvedValue([]);

      await controller.getTransactionHistory(userId);

      expect(spy).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAccountBalance', () => {
    it('should call transactionService.getAccountBalance with correct arguments', async () => {
      const userId = '123';

      const spy = jest.spyOn(transactionService, 'getAccountBalance').mockResolvedValue(0);

      await controller.getAccountBalance(userId);

      expect(spy).toHaveBeenCalledWith(userId);
    });
  });
});
