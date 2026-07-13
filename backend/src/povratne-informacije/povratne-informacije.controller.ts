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
import { PovratneInformacijeService } from './povratne-informacije.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DodajPovratnuInformacijuDto } from './dto/dodaj-povratnu-informaciju.dto';
import { AzurirajPovratnuInformacijuDto } from './dto/azuriraj-povratnu-informaciju.dto';

@Controller('povratne-informacije')
export class PovratneInformacijeController {
  constructor(
    private readonly povratneInformacijeServis: PovratneInformacijeService,
  ) {}

  @Get(':lokacijaId')
  dohvatiPovratneInformacijeZaLokaciju(
    @Param('lokacijaId', ParseIntPipe) id: number,
  ) {
    return this.povratneInformacijeServis.dohvatiPovratneInformacijeZaLokaciju(
      id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':lokacijaId')
  objaviPovratnuInformaciju(
    @Param('lokacijaId', ParseIntPipe) lokacijaId: number,
    @Body() dto: DodajPovratnuInformacijuDto,
    @Req() req: any,
  ) {
    return this.povratneInformacijeServis.objaviPovratnuInformaciju(
      lokacijaId,
      dto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':lokacijaId/:povratnaInformacijaId')
  azurirajPovratnuInformaciju(
    @Param('lokacijaId', ParseIntPipe) lokacijaId: number,
    @Param('povratnaInformacijaId', ParseIntPipe) povratnaInformacijaId: number,
    @Body() dto: AzurirajPovratnuInformacijuDto,
    @Req() req: any,
  ) {
    return this.povratneInformacijeServis.azurirajPovratnuInformaciju(
      lokacijaId,
      povratnaInformacijaId,
      dto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':lokacijaId/:povratnaInformacijaId')
  obrisiPovratnuInformaciju(
    @Param('lokacijaId', ParseIntPipe) lokacijaId: number,
    @Param('povratnaInformacijaId', ParseIntPipe) povratnaInformacijaId: number,
    @Req() req: any,
  ) {
    return this.povratneInformacijeServis.obrisiPovratnuInformaciju(
      lokacijaId,
      povratnaInformacijaId,
      req.user.userId,
    );
  }
}
