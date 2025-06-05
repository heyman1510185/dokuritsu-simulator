import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('DiagnosisController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/api/diagnosis (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/diagnosis')
      .send({ q1: 'a' })
      .expect(201)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      });
  });
});
