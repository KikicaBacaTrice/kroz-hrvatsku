import { Module } from '@nestjs/common';
import { PostignucaService } from './postignuca.service';
import { PostignucaController } from './postignuca.controller';

@Module({
  providers: [PostignucaService],
  controllers: [PostignucaController]
})
export class PostignucaModule {}
