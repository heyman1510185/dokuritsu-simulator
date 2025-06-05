import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export type ExpenseRule = {
  category: string;
  result: 'true' | 'false' | 'gray';
  reason: string;
  reference: string;
};

@Injectable()
export class ExpenseService {
  private rules: ExpenseRule[];

  constructor() {
    // Load rules relative to the compiled file location so it works
    // regardless of the working directory. The JSON file lives in the
    // backend package root.
    const path = join(__dirname, '..', '..', 'expense_rules.json');
    const txt = readFileSync(path, 'utf8');
    this.rules = JSON.parse(txt);
  }

  check(category: string) {
    const found = this.rules.find(
      (r) => r.category.toLowerCase() === category.toLowerCase(),
    );
    if (!found) {
      return { result: 'gray', reason: 'No rule found', reference: '' };
    }
    return found;
  }
}
