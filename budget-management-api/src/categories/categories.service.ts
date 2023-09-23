import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto, userId: string) {
    console.log(dto);

    try {
      const data = await this.prisma.category.create({
        data: { name: dto.name, budgetId: dto.budgetId, userId: userId },
      });

      return { name: data.name };
    } catch (error) {
      throw new NotFoundException('Failed to add category');
    }
  }

  async getAllCategories(userId: string) {
    try {
      const data = await this.prisma.category.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return data;
    } catch (error) {
      throw new NotFoundException('No categories found');
    }
  }

  async getCategoryById(categoryId: string) {
    try {
      const data = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
        },
        select: {
          id: true,
          name: true,
          transactions: true,
        },
      });

      return data;
    } catch (error) {
      throw new NotFoundException('No categories found');
    }
  }

  async updateCategory(dto: UpdateCategoryDto, categoryId: string) {
    try {
      await this.prisma.category.update({
        where: { id: categoryId },
        data: {
          name: dto.name,
        },
      });

      return { update: 'Updated category' };
    } catch (error) {
      throw new NotAcceptableException('Failed to update category');
    }
  }

  async deleteCategory(categoryId: string) {
    try {
      await this.prisma.category.delete({
        where: {
          id: categoryId,
        },
      });

      return { delete: 'Deleted category' };
    } catch (error) {
      throw new NotAcceptableException('Failed to remove category');
    }
  }
}
