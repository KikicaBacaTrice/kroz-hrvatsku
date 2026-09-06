import { Module } from '@nestjs/common';
import { KorisniciService } from './korisnici.service';
import { KorisniciController } from './korisnici.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PovratneInformacijeModule } from 'src/povratne-informacije/povratne-informacije.module';

@Module({
  imports: [PrismaModule, PovratneInformacijeModule],
  providers: [KorisniciService],
  controllers: [KorisniciController],
})
export class KorisniciModule {}
