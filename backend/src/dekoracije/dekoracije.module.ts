import { Module } from '@nestjs/common';
import { DekoracijeService } from './dekoracije.service';
import { DekoracijeController } from './dekoracije.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DekoracijeService],
  controllers: [DekoracijeController],
  exports: [DekoracijeService],
})
export class DekoracijeModule {}
