import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  amount?: string;

  @IsString()
  description?: string;

  @IsDate()
  date?: Date;
}
