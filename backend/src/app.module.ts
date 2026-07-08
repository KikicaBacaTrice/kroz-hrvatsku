import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KorisniciModule } from './korisnici/korisnici.module';

@Module({
  imports: [PrismaModule, KorisniciModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
