import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransactionQueryParsePipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}
  async transform({ ...value }: any) {
    return {
      // categoryId: categoryId,
      ...value,
    };
  }
}
