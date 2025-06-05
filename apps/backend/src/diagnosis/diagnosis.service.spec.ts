import { DiagnosisService } from './diagnosis.service';

describe('DiagnosisService', () => {
  it('should calculate todos and costs', () => {
    const service = new DiagnosisService();
    const result = service.calculate({});
    expect(result.todos.length).toBeGreaterThan(0);
    expect(result.costs.setup).toBe(100000);
  });

  it('should save and retrieve latest', async () => {
    const service = new DiagnosisService();
    const saved = await service.save(1, { foo: 'bar' });
    const latest = await service.latest(1);
    expect(latest).toEqual(saved);
  });
});
