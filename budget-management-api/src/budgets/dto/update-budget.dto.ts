import { IsDate, IsString } from 'class-validator';

export class UpdateBudgetDto {
  @IsString()
  name?: string;

  @IsString()
  totalAmount?: string;

  @IsString()
  allottedAmount?: string;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;
}
