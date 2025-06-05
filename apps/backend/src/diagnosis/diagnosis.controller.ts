import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';

@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly service: DiagnosisService) {}

  @Post()
  calculate(@Body() answers: Record<string, string>) {
    return this.service.calculate(answers);
  }

  @Get('latest')
  async latest() {
    // assume user id 1 for demo
    return this.service.latest(1);
  }
}
