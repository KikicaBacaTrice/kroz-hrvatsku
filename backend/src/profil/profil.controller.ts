import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfilService } from './profil.service';
import { AzuriranjProfilDto } from './dto/azuriraj-profil.dto';
import { AzuriranjProfilnuSlikuDto } from './dto/azuriraj-profilnu-sliku.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @Patch('ja')
  azurirajProfil(@Req() req: any, @Body() dto: AzuriranjProfilDto) {
    return this.profilService.azurirajProfil(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('ja/slika')
  azurirajProfilnuSliku(
    @Req() req: any,
    @Body() dto: AzuriranjProfilnuSlikuDto,
  ) {
    return this.profilService.azurirajProfilnuSliku(req.user.userId, dto.url);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('ja/slika')
  obrisiProfilnuSliku(@Req() req: any) {
    return this.profilService.obrisiProfilnuSliku(req.user.userId);
  }
}
