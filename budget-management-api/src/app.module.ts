import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BudgetsModule } from './budgets/budgets.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guard';

@Module({
  imports: [
    BudgetsModule,
    CategoriesModule,
    TransactionsModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
