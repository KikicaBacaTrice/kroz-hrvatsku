import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistracijaDto } from './dto/registracija.dto';
import { PrijavaDto } from './dto/prijava.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registracija')
  registracija(@Body() dto: RegistracijaDto) {
    return this.authService.registracija(dto);
  }

  @Post('prijava')
  prijava(@Body() dto: PrijavaDto) {
    return this.authService.prijava(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja')
  dohvatiMene(@Req() req: any) {
    return this.authService.dohvatiMene(req.user.userId);
  }
}
