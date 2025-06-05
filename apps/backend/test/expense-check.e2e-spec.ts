import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Expense Check API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/api/expense/check (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/expense/check')
      .send({ category: 'Transportation' })
      .expect(201);
    expect(res.body.result).toBe('true');
  });
});
