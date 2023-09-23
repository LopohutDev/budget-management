import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BudgetsService } from 'src/budgets/budgets.service';

@Module({
  providers: [TransactionsService, BudgetsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
