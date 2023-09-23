import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';

@Module({
  providers: [BudgetsService],
  controllers: [BudgetsController]
})
export class BudgetsModule {}
