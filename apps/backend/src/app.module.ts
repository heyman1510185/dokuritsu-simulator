import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { CashflowModule } from './cashflow/cashflow.module';

@Module({
  imports: [DiagnosisModule, CashflowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
