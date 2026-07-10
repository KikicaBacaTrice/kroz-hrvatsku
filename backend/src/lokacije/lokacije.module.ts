import { Module } from '@nestjs/common';
import { LokacijeService } from './lokacije.service';
import { LokacijeController } from './lokacije.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LokacijeService],
  controllers: [LokacijeController],
})
export class LokacijeModule {}
