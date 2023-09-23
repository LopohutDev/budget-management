import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionQueryParsePipe } from './pipes/transaction-query-parse.pipe';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService, // private config: ConfigService,
  ) {}

  @Post('create')
  createTransaction(
    @Body() dto: CreateTransactionDto,
    @GetUser('id') userId: string,
  ) {
    return this.transactionsService.createTransaction(dto);
  }

  @Get('')
  getAllTransactions(@Query() query: any) {
    console.log('query', query);
    return this.transactionsService.getTransactionById(query.categoryId);
  }

  @Get(':id')
  getTransactionById(@Param('id') categoryId: string) {
    return this.transactionsService.getTransactionById(categoryId);
  }

  @Put(':id')
  updateTransaction(
    @Body() dto: UpdateTransactionDto,
    @Param('id') categoryId: string,
  ) {
    return this.transactionsService.updateTransaction(dto, categoryId);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') categoryId: string) {
    return this.transactionsService.deleteTransaction(categoryId);
  }
}
