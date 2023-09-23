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
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService, // private config: ConfigService,
  ) {}

  @Post('create')
  createCategory(
    @Body() dto: CreateCategoryDto,
    @GetUser('id') userId: string,
  ) {
    return this.categoriesService.createCategory(dto, userId);
  }

  @Get('')
  getAllCategories(@GetUser('id') userId: string) {
    return this.categoriesService.getAllCategories(userId);
  }

  @Get(':id')
  getCategoryById(@Param('id') categoryId: string) {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @Put(':id')
  updateCategory(
    @Body() dto: CreateCategoryDto,
    @Param('id') categoryId: string,
  ) {
    return this.categoriesService.updateCategory(dto, categoryId);
  }

  @Delete(':id')
  deleteCategory(@Param('id') categoryId: string) {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
