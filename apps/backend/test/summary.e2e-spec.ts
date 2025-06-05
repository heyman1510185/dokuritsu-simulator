import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Summary API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/api/summary (GET)', async () => {
    await request(app.getHttpServer())
      .post('/api/incomes')
      .send({ date: '2025-06-01', amount: 1000, category: 'Salary' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/api/expenses')
      .send({ date: '2025-06-02', amount: 200, category: 'Food' })
      .expect(201);
    const res = await request(app.getHttpServer())
      .get('/api/summary?period=month')
      .expect(200);
    expect(res.body.income).toBe(1000);
    expect(res.body.expense).toBe(200);
  });
});
