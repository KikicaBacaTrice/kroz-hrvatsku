import { Module } from '@nestjs/common';
import { KategorijeService } from './kategorije.service';
import { KategorijeController } from './kategorije.controller';

@Module({
  providers: [KategorijeService],
  controllers: [KategorijeController]
})
export class KategorijeModule {}
