import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AzurirajKorisnikaDto } from './dto/azuriraj-korisnika.dto';
import { KorisniciService } from './korisnici.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UlogeGuard } from 'src/auth/uloge.guard';
import { Uloge } from 'src/auth/uloge.decorator';

@UseGuards(JwtAuthGuard, UlogeGuard)
@Uloge(1)
@Controller('korisnici')
export class KorisniciController {
  constructor(private readonly korisniciService: KorisniciService) {}

  @Get()
  dohvatiSve() {
    return this.korisniciService.dohvatiSve();
  }

  @Get(':id')
  dohvatiJednog(@Param('id', ParseIntPipe) id: number) {
    return this.korisniciService.dohvatiJednog(id);
  }

  @Patch(':id')
  azuriraj(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajKorisnikaDto,
  ) {
    return this.korisniciService.azuriraj(id, dto);
  }

  @Delete(':id')
  obrisi(@Param('id', ParseIntPipe) id: number) {
    return this.korisniciService.obrisi(id);
  }
}
