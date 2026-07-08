import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KorisniciModule } from './korisnici/korisnici.module';
import { ProfilModule } from './profil/profil.module';

@Module({
  imports: [PrismaModule, KorisniciModule, ProfilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
