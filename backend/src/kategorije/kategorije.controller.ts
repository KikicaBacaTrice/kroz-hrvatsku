import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { KategorijeService } from './kategorije.service';
import { DodajKategorijuDto } from './dto/dodaj-kategoriju.dto';
import { AzurirajKategorijuDto } from './dto/azuriraj-kategoriju.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UlogeGuard } from 'src/auth/uloge.guard';
import { Uloge } from 'src/auth/uloge.decorator';

@Controller('kategorije')
export class KategorijeController {
  constructor(private readonly kategorijeServis: KategorijeService) {}

  @Get()
  dohvatiSve() {
    return this.kategorijeServis.dohvatiSve();
  }

  @Get(':id')
  dohvatiJednu(@Param('id', ParseIntPipe) id: number) {
    return this.kategorijeServis.dohvatiJednu(id);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Post()
  dodajKategoriju(@Body() dto: DodajKategorijuDto) {
    return this.kategorijeServis.dodajKategoriju(dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Patch(':id')
  azurirajKategoriju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajKategorijuDto,
  ) {
    return this.kategorijeServis.azurirajKategoriju(id, dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Delete(':id')
  obrisiKategoriju(@Param('id', ParseIntPipe) id: number) {
    return this.kategorijeServis.obrisiKategoriju(id);
  }
}
