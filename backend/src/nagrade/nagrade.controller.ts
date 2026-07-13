import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NagradeService } from './nagrade.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('nagrade')
export class NagradeController {
  constructor(private readonly nagradeServis: NagradeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('ja')
  dohvatiMojeNagrade(@Req() req: any) {
    return this.nagradeServis.dohvatiMojeNagrade(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/postignuca')
  dohvatiMojaPostignuca(@Req() req: any) {
    return this.nagradeServis.dohvatiMojaPostignuca(req.user.userId);
  }
}
