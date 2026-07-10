import { Module } from '@nestjs/common';
import { KategorijeService } from './kategorije.service';
import { KategorijeController } from './kategorije.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [KategorijeService],
  controllers: [KategorijeController],
})
export class KategorijeModule {}
