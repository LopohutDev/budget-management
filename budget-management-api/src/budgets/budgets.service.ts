import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async createBudget(dto: CreateBudgetDto, userId: string) {
    const amount = Number(dto.amount);

    delete dto.amount;

    try {
      const data = await this.prisma.budget.create({
        data: {
          ...dto,
          allottedAmount: amount,
          totalAmount: amount,
          userId,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException('Failed to create budget');
    }
  }

  async getAllBudget(userId: string) {
    try {
      const data = await this.prisma.budget.findMany({
        where: {
          userId: userId,
        },
        select: {
          totalAmount: true,
          allottedAmount: true,
          name: true,
          id: true,
        },
      });

      return data;
    } catch (error) {
      throw new NotFoundException('Budget not found');
    }
  }

  async getBudget(budgetId: string) {
    try {
      const data = await this.prisma.budget.findFirst({
        where: {
          id: budgetId,
        },
        select: {
          totalAmount: true,
          allottedAmount: true,
          name: true,
          id: true,
          categories: true,
        },
      });

      return data;
    } catch (error) {
      throw new NotFoundException('Budget not found');
    }
  }

  async updateBudget(dto: UpdateBudgetDto, budgetId: string) {
    try {
      const totalAmount = Number(dto.totalAmount);
      const allottedAmount = dto.allottedAmount
        ? Number(dto.allottedAmount)
        : undefined;

      const data = await this.prisma.budget.update({
        where: {
          id: budgetId,
        },
        data: {
          ...dto,
          totalAmount,
          allottedAmount,
        },
      });

      return data;
    } catch (error) {
      console.log('budgetError', error);
      throw new NotAcceptableException('Failed to update budget');
    }
  }

  async deleteBudget(budgetId: string) {
    try {
      const data = await this.prisma.budget.delete({
        where: {
          id: budgetId,
        },
      });

      return data;
    } catch (error) {
      throw new NotAcceptableException('Failed to delete budget');
    }
  }
}
