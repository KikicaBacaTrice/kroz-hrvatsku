import { Module } from '@nestjs/common';
import { PovratneInformacijeService } from './povratne-informacije.service';
import { PovratneInformacijeController } from './povratne-informacije.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NagradeModule } from 'src/nagrade/nagrade.module';

@Module({
  imports: [PrismaModule, NagradeModule],
  providers: [PovratneInformacijeService],
  controllers: [PovratneInformacijeController],
})
export class PovratneInformacijeModule {}
