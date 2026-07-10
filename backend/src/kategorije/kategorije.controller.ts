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
import { KategorijeService } from './kategorije.service';
import { DodajKategorijuDto } from './dto/dodaj-kategoriju.dto';
import { AzurirajKategorijuDto } from './dto/azuriraj-kategoriju.dto';

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

  @Post()
  dodajKategoriju(@Body() dto: DodajKategorijuDto) {
    return this.kategorijeServis.dodajKategoriju(dto);
  }

  @Patch(':id')
  azurirajKategoriju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajKategorijuDto,
  ) {
    return this.kategorijeServis.azurirajKategoriju(id, dto);
  }

  @Delete(':id')
  obrisiKategoriju(@Param('id', ParseIntPipe) id: number) {
    return this.kategorijeServis.obrisiKategoriju(id);
  }
}
