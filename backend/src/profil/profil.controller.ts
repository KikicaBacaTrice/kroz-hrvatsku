import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfilService } from './profil.service';
import { AzuriranjProfilDto } from './dto/azuriraj-profil.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  @Get('korisnik/:id')
  dohvatiJavniProfil(@Param('id', ParseIntPipe) id: number) {
    return this.profilService.dohvatiJavniProfil(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja')
  dohvatiMoj(@Req() req: any) {
    return this.profilService.dohvatiMoj(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/statistika')
  dohvatiMojuStatistiku(@Req() req: any) {
    return this.profilService.dohvatiMojuStatistiku(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/slike-posjeta')
  dohvatiMojeSlikePosjeta(@Req() req: any) {
    return this.profilService.dohvatiMojeSlikePosjeta(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('ja')
  azurirajProfil(@Req() req: any, @Body() dto: AzuriranjProfilDto) {
    return this.profilService.azurirajProfil(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('ja/slika')
  @UseInterceptors(
    FileInterceptor('slika', {
      storage: diskStorage({
        destination: join(process.cwd(), 'prijenos', 'profili'),
        filename: (req, file, callback) => {
          const ekstenzija = file.originalname.split('.').pop();
          const naziv = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ekstenzija}`;

          callback(null, naziv);
        },
      }),
    }),
  )
  azurirajProfilnuSliku(
    @Req() req: any,
    @UploadedFile() slika: Express.Multer.File,
  ) {
    return this.profilService.azurirajProfilnuSliku(
      req.user.userId,
      `/prijenos/profili/${slika.filename}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('ja/slika')
  obrisiProfilnuSliku(@Req() req: any) {
    return this.profilService.obrisiProfilnuSliku(req.user.userId);
  }
}
