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
import { PostignucaService } from './postignuca.service';
import { DodajPostignuceDto } from './dto/dodaj-postignuce.dto';
import { AzurirajPostignuceDto } from './dto/azuriraj-postignuce.dto';

@Controller('postignuca')
export class PostignucaController {
  constructor(private readonly postignucaServis: PostignucaService) {}

  @Get()
  dohvatiSva() {
    return this.postignucaServis.dohvatiSva();
  }

  @Get(':id')
  dohvatiJedno(@Param('id', ParseIntPipe) id: number) {
    return this.postignucaServis.dohvatiJedno(id);
  }

  @Post()
  dodajPostignuce(@Body() dto: DodajPostignuceDto) {
    return this.postignucaServis.dodajPostignuce(dto);
  }

  @Patch(':id')
  azurirajPostignuce(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajPostignuceDto,
  ) {
    return this.postignucaServis.azurirajPostignuce(id, dto);
  }

  @Delete(':id')
  obrisiPostignuce(@Param('id', ParseIntPipe) id: number) {
    return this.postignucaServis.obrisiPostignuce(id);
  }
}
