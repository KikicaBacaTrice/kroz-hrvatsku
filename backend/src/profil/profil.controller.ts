import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfilService } from './profil.service';
import { AzuriranjProfilDto } from './dto/azuriraj-profil.dto';
import { AzuriranjProfilnuSlikuDto } from './dto/azuriraj-profilnu-sliku.dto';

@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  @Get(':id')
  dohvati(@Param('id', ParseIntPipe) id: number) {
    return this.profilService.dohvatiMoj(id);
  }

  @Post(':id')
  kreirajProfil(@Param('id', ParseIntPipe) id: number) {
    return this.profilService.kreirajProfil(id);
  }

  @Patch(':id')
  azurirajProfil(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzuriranjProfilDto,
  ) {
    return this.profilService.azurirajProfil(id, dto);
  }

  @Patch(':id/slika')
  azurirajProfilnuSliku(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzuriranjProfilnuSlikuDto,
  ) {
    return this.profilService.azurirajProfilnuSliku(id, dto.url);
  }

  @Delete(':id/slika')
  obrisiProfilnuSliku(@Param('id', ParseIntPipe) id: number) {
    return this.profilService.obrisiProfilnuSliku(id);
  }

  @Get('korisnik/:id')
  dohvatiJavniProfil(@Param('id', ParseIntPipe) id: number) {
    return this.profilService.dohvatiJavniProfil(id);
  }
}
