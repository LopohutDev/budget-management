import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { BudgetsService } from 'src/budgets/budgets.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private budgetService: BudgetsService,
  ) {}

  async createTransaction(dto: CreateTransactionDto) {
    try {
      console.log('dto.amount', dto.amount);
      const amount = Number(dto.amount);

      const data = await this.prisma.transaction.create({
        data: {
          ...dto,
          amount,
        },
        select: {
          category: {
            select: {
              budgetId: true,
            },
          },
        },
      });

      console.log('data', data);

      const budget = await this.budgetService.getBudget(
        data.category.budgetId || '',
      );

      const totalAmount = Number(budget?.totalAmount || 0) - Number(dto.amount);

      await this.budgetService.updateBudget(
        {
          totalAmount: totalAmount.toString(),
        },
        data.category.budgetId || '',
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException('Failed to create transaction');
    }
  }

  async getTransactionByCategoryId(categoryId?: string) {
    try {
      const data = await this.prisma.transaction.findMany({
        where: {
          categoryId,
        },
      });

      return data;
    } catch (error) {
      throw new NotFoundException('Transactions not found');
    }
  }

  async getAllTransaction() {
    try {
      const data = await this.prisma.transaction.findMany();

      return data;
    } catch (error) {
      throw new NotFoundException('Transactions not found');
    }
  }

  async getTransactionById(transactionId: string) {
    try {
      const data = await this.prisma.transaction.findFirst({
        where: {
          id: transactionId,
        },
      });

      return data;
    } catch (error) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async updateTransaction(dto: UpdateTransactionDto, transactionId: string) {
    try {
      const amount = Number(dto.amount);

      const data = await this.prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          ...dto,
          amount,
        },
      });

      return data;
    } catch (error) {
      throw new NotAcceptableException('Failed to update transaction');
    }
  }

  async deleteTransaction(transactionId: string) {
    try {
      const data = await this.prisma.transaction.delete({
        where: {
          id: transactionId,
        },
        select: {
          amount: true,
          category: {
            select: {
              budgetId: true,
            },
          },
        },
      });

      const budget = await this.budgetService.getBudget(
        data.category.budgetId || '',
      );

      const totalAmount =
        Number(budget?.totalAmount || 0) + Number(data.amount);

      await this.budgetService.updateBudget(
        {
          totalAmount: totalAmount.toString(),
        },
        data.category.budgetId || '',
      );

      return data;
    } catch (error) {
      throw new NotAcceptableException('Failed to delete transaction');
    }
  }
}
