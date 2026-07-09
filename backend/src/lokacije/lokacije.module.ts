import { Module } from '@nestjs/common';
import { LokacijeService } from './lokacije.service';
import { LokacijeController } from './lokacije.controller';

@Module({
  providers: [LokacijeService],
  controllers: [LokacijeController]
})
export class LokacijeModule {}
