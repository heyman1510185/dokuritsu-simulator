import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('api/expense')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Post('check')
  check(@Body() body: { category: string }) {
    return this.service.check(body.category);
  }
}
