import { Module } from '@nestjs/common';
import { NagradeService } from './nagrade.service';
import { NagradeController } from './nagrade.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DekoracijeModule } from 'src/dekoracije/dekoracije.module';

@Module({
  imports: [PrismaModule, DekoracijeModule],
  providers: [NagradeService],
  controllers: [NagradeController],
  exports: [NagradeService],
})
export class NagradeModule {}
