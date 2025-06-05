import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';

@Injectable()
export class CashflowService {
  private incomes: {
    id: number;
    userId: number;
    date: Date;
    amount: number;
    category: string;
    memo?: string | null;
  }[] = [];
  private expenses: {
    id: number;
    userId: number;
    date: Date;
    amount: number;
    category: string;
    memo?: string | null;
  }[] = [];

  async addIncome(data: {
    userId: number;
    date: Date;
    amount: number;
    category: string;
    memo?: string | null;
  }) {
    const record = { id: this.incomes.length + 1, ...data };
    this.incomes.push(record);
    return record;
  }

  async addExpense(data: {
    userId: number;
    date: Date;
    amount: number;
    category: string;
    memo?: string | null;
  }) {
    const record = { id: this.expenses.length + 1, ...data };
    this.expenses.push(record);
    return record;
  }

  async importCsv(csv: string, userId: number) {
    const records = parse(csv, { columns: true, skip_empty_lines: true });
    for (const r of records) {
      const amount = parseInt(r['金額']);
      const date = new Date(r['日付']);
      const category = r['品目'] || 'Unknown';
      const memo = r['メモ'] || null;
      if (amount >= 0) {
        await this.addIncome({ userId, date, amount, category, memo });
      } else {
        await this.addExpense({
          userId,
          date,
          amount: -amount,
          category,
          memo,
        });
      }
    }
    return { count: records.length };
  }

  async summary(userId: number, period: 'month' | 'year') {
    const start = new Date();
    if (period === 'month') {
      start.setDate(1);
    } else {
      start.setMonth(0, 1);
    }
    start.setHours(0, 0, 0, 0);
    const incomes = this.incomes.filter(
      (i) => i.userId === userId && i.date >= start,
    );
    const expenses = this.expenses.filter(
      (e) => e.userId === userId && e.date >= start,
    );
    const incomeSum = incomes.reduce((a, b) => a + b.amount, 0);
    const expenseSum = expenses.reduce((a, b) => a + b.amount, 0);
    return { income: incomeSum, expense: expenseSum };
  }

  async forecast(userId: number) {
    const data = this.incomes
      .filter((i) => i.userId === userId)
      .sort((a, b) => +a.date - +b.date);
    const amounts = data.map((i) => i.amount);
    const forecasts: number[] = [];
    const window = 3;
    for (let i = 0; i < 3; i++) {
      const slice = amounts.slice(-window);
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length || 0;
      forecasts.push(Math.round(avg));
      amounts.push(avg);
    }
    return forecasts;
  }
}
