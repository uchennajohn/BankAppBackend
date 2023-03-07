import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DepositTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  depositorName: string;
}
