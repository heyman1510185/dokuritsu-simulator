import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CashflowService } from './cashflow.service';

@Controller('api')
export class CashflowController {
  constructor(private readonly service: CashflowService) {}

  @Post('incomes')
  addIncome(@Body() body: any) {
    return this.service.addIncome({
      userId: 1,
      date: new Date(body.date),
      amount: Number(body.amount),
      category: body.category,
      memo: body.memo ?? null,
    });
  }

  @Post('expenses')
  addExpense(@Body() body: any) {
    return this.service.addExpense({
      userId: 1,
      date: new Date(body.date),
      amount: Number(body.amount),
      category: body.category,
      memo: body.memo ?? null,
    });
  }

  @Post('import-csv')
  importCsv(@Body() body: { csv: string }) {
    return this.service.importCsv(body.csv, 1);
  }

  @Get('summary')
  summary(@Query('period') period: 'month' | 'year' = 'month') {
    return this.service.summary(1, period);
  }

  @Get('forecast')
  forecast() {
    return this.service.forecast(1);
  }
}
