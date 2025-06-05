import { Test } from '@nestjs/testing';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';

describe('DiagnosisController', () => {
  let controller: DiagnosisController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DiagnosisController],
      providers: [DiagnosisService],
    }).compile();
    controller = moduleRef.get(DiagnosisController);
  });

  it('should return calculated result', () => {
    const result = controller.calculate({ q1: 'a' });
    expect(result.todos.length).toBe(2);
  });
});
