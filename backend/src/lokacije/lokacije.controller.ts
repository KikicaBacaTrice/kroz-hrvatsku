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

  @Post()
  dodajLokaciju(@Body() dto: DodajLokacijaDto) {
    return this.lokacijeServis.dodajLokaciju(dto);
  }

  @Patch(':id')
  azurirajLokaciju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajLokacijuDto,
  ) {
    return this.lokacijeServis.azurirajLokaciju(id, dto);
  }

  @Delete(':id')
  obrisiLokaciju(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.obrisi(id);
  }
}
