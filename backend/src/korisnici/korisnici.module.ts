import { Module } from '@nestjs/common';
import { KorisniciService } from './korisnici.service';
import { KorisniciController } from './korisnici.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [KorisniciService],
  controllers: [KorisniciController],
})
export class KorisniciModule {}
