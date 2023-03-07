// import { Module } from '@nestjs/common';
// import { TransactionController } from './transaction.controller';
// import { TransactionService } from './transaction.service';

// @Module({
//   controllers: [TransactionController],
//   providers: [TransactionService]
// })
// export class TransactionModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionSchema } from '../transaction/schema/transaction.schema';
import { User, UserSchema } from '../auth/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
