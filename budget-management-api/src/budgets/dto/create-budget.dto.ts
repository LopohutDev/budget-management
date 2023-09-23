import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  amount?: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
