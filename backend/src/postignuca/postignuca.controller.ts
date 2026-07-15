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
import { PostignucaService } from './postignuca.service';
import { DodajPostignuceDto } from './dto/dodaj-postignuce.dto';
import { AzurirajPostignuceDto } from './dto/azuriraj-postignuce.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UlogeGuard } from 'src/auth/uloge.guard';
import { Uloge } from 'src/auth/uloge.decorator';

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

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Post()
  dodajPostignuce(@Body() dto: DodajPostignuceDto) {
    return this.postignucaServis.dodajPostignuce(dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Patch(':id')
  azurirajPostignuce(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajPostignuceDto,
  ) {
    return this.postignucaServis.azurirajPostignuce(id, dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Delete(':id')
  obrisiPostignuce(@Param('id', ParseIntPipe) id: number) {
    return this.postignucaServis.obrisiPostignuce(id);
  }
}
