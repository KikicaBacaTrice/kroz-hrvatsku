import { Module } from '@nestjs/common';
import { LokacijeService } from './lokacije.service';
import { LokacijeController } from './lokacije.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NagradeModule } from 'src/nagrade/nagrade.module';

@Module({
  imports: [PrismaModule, NagradeModule],
  providers: [LokacijeService],
  controllers: [LokacijeController],
})
export class LokacijeModule {}
