import { Module } from '@nestjs/common';
import { KorisniciService } from './korisnici.service';
import { KorisniciController } from './korisnici.controller';

@Module({
  providers: [KorisniciService],
  controllers: [KorisniciController]
})
export class KorisniciModule {}
