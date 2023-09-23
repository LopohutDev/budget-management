import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetTransactionDto {
  @IsString()
  categoryId?: string;
}
