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
import { DekoracijeService } from './dekoracije.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DodajDekoracijuDto } from './dto/dodaj-dekoraciju.dto';
import { AzurirajDekoracijuDto } from './dto/azuriraj-dekoraciju.dto';
import { AktivirajDekoracijuDto } from './dto/aktiviraj-dekoraciju.dto';
import { DodajTipDekoracijeDto } from './dto/dodaj-tip-dekoracije.dto';
import { AzurirajTipDekoracijeDto } from './dto/azuriraj-tip-dekoracije.dto';
import { UlogeGuard } from 'src/auth/uloge.guard';
import { Uloge } from 'src/auth/uloge.decorator';
import { DeaktivirajTipDekoracijeDto } from './dto/deaktiviraj-tip-dekoracije';

@Controller('dekoracije')
export class DekoracijeController {
  constructor(private readonly dekoracijeServis: DekoracijeService) {}

  @Get()
  dohvatiSve() {
    return this.dekoracijeServis.dohvatiSve();
  }

  @Get('tipovi')
  dohvatiTipoveDekoracije() {
    return this.dekoracijeServis.dohvatiTipDekoracije();
  }

  @Get('tipovi/:id/dekoracije')
  dohvatiDekoracijeZaTip(@Param('id', ParseIntPipe) id: number) {
    return this.dekoracijeServis.dohvatiDekoracijeZaTip(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/moje')
  dohvatiMojeDekoracije(@Req() req: any) {
    return this.dekoracijeServis.dohvatiMojeDekoracije(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/trgovina')
  dohvatiTrgovinuZaKorisnika(@Req() req: any) {
    return this.dekoracijeServis.dohvatiTrgovinuZaKorisnika(req.user.userId);
  }

  @Get(':id')
  dohvatiJednu(@Param('id', ParseIntPipe) id: number) {
    return this.dekoracijeServis.dohvatiJednu(id);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Post()
  dodajDekoraciju(@Body() dto: DodajDekoracijuDto) {
    return this.dekoracijeServis.dodajDekoraciju(dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Patch(':id')
  azurirajDekoraciju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajDekoracijuDto,
  ) {
    return this.dekoracijeServis.azurirajDekoraciju(id, dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Delete(':id')
  obrisiDekoraciju(@Param('id', ParseIntPipe) id: number) {
    return this.dekoracijeServis.obrisiDekoraciju(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('ja/aktiviraj')
  aktivirajDekoraciju(@Req() req: any, @Body() dto: AktivirajDekoracijuDto) {
    return this.dekoracijeServis.aktivirajDekoraciju(
      req.user.userId,
      dto.dekoracijaId,
      dto.pozicijaPrikaza,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('ja/deaktiviraj-tip')
  deaktivirajTipDekoracije(
    @Req() req: any,
    @Body() dto: DeaktivirajTipDekoracijeDto,
  ) {
    return this.dekoracijeServis.deaktivirajAktivnuDekoracijuZaTip(
      req.user.userId,
      dto.tipDekoracijeId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('ja/deaktiviraj/:dekoracijaId')
  deaktivirajDekoraciju(
    @Req() req: any,
    @Param('dekoracijaId', ParseIntPipe) dekoracijaId: number,
  ) {
    return this.dekoracijeServis.deaktivirajDekoraciju(
      req.user.userId,
      dekoracijaId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('ja/kupi/:dekoracijaId')
  kupiDekoraciju(
    @Req() req: any,
    @Param('dekoracijaId', ParseIntPipe) dekoracijaId: number,
  ) {
    return this.dekoracijeServis.kupiDekoraciju(req.user.userId, dekoracijaId);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Post('tipovi')
  dodajTipDekoracije(@Body() dto: DodajTipDekoracijeDto) {
    return this.dekoracijeServis.dodajTipDekoracije(dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Patch('tipovi/:id')
  azurirajTipDekoracije(
    @Param('id', ParseIntPipe) tipId: number,
    @Body() dto: AzurirajTipDekoracijeDto,
  ) {
    return this.dekoracijeServis.azurirajTipDekoracije(tipId, dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(1)
  @Delete('tipovi/:id')
  obrisiTipDekoracije(@Param('id', ParseIntPipe) id: number) {
    return this.dekoracijeServis.obrisiTipDekoracije(id);
  }
}
