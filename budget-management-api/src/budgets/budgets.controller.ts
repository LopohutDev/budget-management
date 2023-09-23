import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(
    private budgetsService: BudgetsService, // private config: ConfigService,
  ) {}

  @Post('create')
  createTransaction(
    @Body() dto: CreateBudgetDto,
    @GetUser('id') userId: string,
  ) {
    return this.budgetsService.createBudget(dto, userId);
  }

  @Get('')
  getAllTransactions(@GetUser('id') userId: string) {
    return this.budgetsService.getAllBudget(userId);
  }

  @Get(':id')
  getTransactionById(@Param('id') budgetId: string) {
    return this.budgetsService.getBudget(budgetId);
  }

  @Put(':id')
  updateTransaction(
    @Body() dto: UpdateBudgetDto,
    @Param('id') budgetId: string,
  ) {
    return this.budgetsService.updateBudget(dto, budgetId);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') budgetId: string) {
    return this.budgetsService.deleteBudget(budgetId);
  }
}
