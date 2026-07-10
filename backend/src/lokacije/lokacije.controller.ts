import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LokacijeService } from './lokacije.service';
import { AzurirajLokacijuDto } from './dto/azuriraj-lokacije.dto';
import { DodajLokacijaDto } from './dto/dodaj-lokacije.dto';
import { FiltrirajLokacijeDto } from './dto/filtriraj-lokacije.dto';
import { DodajSlikuDto } from './dto/dodaj-sliku.dto';
import { AzurirajSlikuLokacijeDto } from './dto/azuriraj-sliku-lokacije.dto';

@Controller('lokacije')
export class LokacijeController {
  constructor(private readonly lokacijeServis: LokacijeService) {}

  @Get()
  dohvatiSve(@Query() filter: FiltrirajLokacijeDto) {
    return this.lokacijeServis.dohvatiSve(filter);
  }

  @Get(':id')
  dohvatiJednu(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.dohvatiJednu(id);
  }

  @Get(':id/slike')
  dohvatiSlikeZaLokaciju(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.dohvatiSlikeZaLokaciju(id);
  }

  @Post()
  dodajLokaciju(@Body() dto: DodajLokacijaDto) {
    return this.lokacijeServis.dodajLokaciju(dto);
  }

  @Post(':id/slike')
  dodajSlikeZaLokaciju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DodajSlikuDto,
  ) {
    return this.lokacijeServis.dodajSlikuZaLokaciju(id, dto);
  }

  @Patch(':id')
  azurirajLokaciju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajLokacijuDto,
  ) {
    return this.lokacijeServis.azurirajLokaciju(id, dto);
  }

  @Patch(':id/slike/:slikaId')
  azurirajPodatkeSlike(
    @Param('id', ParseIntPipe) lokacijaId: number,
    @Param('slikaId', ParseIntPipe) slikaId: number,
    @Body() dto: AzurirajSlikuLokacijeDto,
  ) {
    return this.lokacijeServis.azurirajSlikuZaLokaciju(
      lokacijaId,
      slikaId,
      dto,
    );
  }

  @Delete(':id')
  obrisiLokaciju(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.obrisi(id);
  }

  @Delete(':id/slike/:slikaId')
  obrisiSlikuZaLokaciju(
    @Param('id', ParseIntPipe) lokacijaId: number,
    @Param('slikaId', ParseIntPipe) slikaId: number,
  ) {
    return this.lokacijeServis.obrisiSlikuZaLokaciju(lokacijaId, slikaId);
  }
}
