import { Module } from '@nestjs/common';
import { NagradeService } from './nagrade.service';
import { NagradeController } from './nagrade.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [NagradeService],
  controllers: [NagradeController],
  exports: [NagradeService],
})
export class NagradeModule {}
