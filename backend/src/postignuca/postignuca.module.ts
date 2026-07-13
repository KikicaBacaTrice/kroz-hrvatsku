import { Module } from '@nestjs/common';
import { PostignucaService } from './postignuca.service';
import { PostignucaController } from './postignuca.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostignucaService],
  controllers: [PostignucaController],
})
export class PostignucaModule {}
