import { Injectable } from '@nestjs/common';

@Injectable()
export class DiagnosisService {
  private inMemory: any[] = [];

  calculate(answers: Record<string, string>) {
    // fake logic: produce todos and cost summary based on answers
    const todos = [
      { task: 'Open bank account', due: '2024-06-01' },
      { task: 'Register tax office', due: '2024-06-15' },
    ];
    const costs = {
      setup: 100000,
      monthly: 50000,
    };
    return { todos, costs };
  }

  async save(userId: number, result: any) {
    const record = { id: this.inMemory.length + 1, userId, result };
    this.inMemory.push(record);
    return record;
  }

  async latest(userId: number) {
    return this.inMemory.filter((r) => r.userId === userId).pop();
  }
}
