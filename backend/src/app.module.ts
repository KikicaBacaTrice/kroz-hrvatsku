import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KorisniciModule } from './korisnici/korisnici.module';
import { ProfilModule } from './profil/profil.module';
import { AuthModule } from './auth/auth.module';
import { LokacijeModule } from './lokacije/lokacije.module';
import { KategorijeModule } from './kategorije/kategorije.module';
import { NagradeModule } from './nagrade/nagrade.module';

@Module({
  imports: [PrismaModule, KorisniciModule, ProfilModule, AuthModule, LokacijeModule, KategorijeModule, NagradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
