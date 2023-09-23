import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
