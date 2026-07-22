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
import { PostignucaModule } from './postignuca/postignuca.module';
import { DekoracijeModule } from './dekoracije/dekoracije.module';
import { PovratneInformacijeModule } from './povratne-informacije/povratne-informacije.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    KorisniciModule,
    ProfilModule,
    AuthModule,
    LokacijeModule,
    KategorijeModule,
    NagradeModule,
    PostignucaModule,
    DekoracijeModule,
    PovratneInformacijeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'prijenos'),
      serveRoot: '/prijenos',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
