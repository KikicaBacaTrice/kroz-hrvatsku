import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegistracijaDto } from './dto/registracija.dto';
import bcrypt from 'bcryptjs';
import { PrijavaDto } from './dto/prijava.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registracija(dto: RegistracijaDto) {
    const postojeciKorisnik = await this.prisma.korisnik.findFirst({
      where: {
        OR: [{ email: dto.email }, { korisnickoIme: dto.korisnickoIme }],
      },
    });

    if (postojeciKorisnik) {
      throw new ConflictException('Korisnik već postoji');
    }

    const lozinkaHash = await bcrypt.hash(dto.lozinka, 10);

    const korisnik = await this.prisma.korisnik.create({
      data: {
        ime: dto.ime,
        prezime: dto.prezime,
        korisnickoIme: dto.korisnickoIme,
        email: dto.email,
        lozinkaHash,
        ulogaId: dto.ulogaId,
      },
      select: {
        korisnikId: true,
        ime: true,
        prezime: true,
        korisnickoIme: true,
        email: true,
        ulogaId: true,
      },
    });

    await this.prisma.profil.create({
      data: {
        korisnikId: korisnik.korisnikId,
      },
    });

    const token = await this.jwtService.signAsync({
      sub: korisnik.korisnikId,
      email: korisnik.email,
      ulogaId: korisnik.ulogaId,
    });

    return {
      accessToken: token,
      korisnik,
    };
  }

  async prijava(dto: PrijavaDto) {
    const korisnik = await this.prisma.korisnik.findUnique({
      where: { email: dto.email },
    });

    if (!korisnik) {
      throw new UnauthorizedException('Neispravni podaci za prijavu');
    }

    const lozinkaIspravna = await bcrypt.compare(
      dto.lozinka,
      korisnik.lozinkaHash,
    );

    if (!lozinkaIspravna) {
      throw new UnauthorizedException('Neispravni podaci za prijavu');
    }

    const token = await this.jwtService.signAsync({
      sub: korisnik.korisnikId,
      email: korisnik.email,
      ulogaId: korisnik.ulogaId,
    });

    return {
      accessToken: token,
      korisnik: {
        korisnikId: korisnik.korisnikId,
        ime: korisnik.ime,
        prezime: korisnik.prezime,
        korisnickoIme: korisnik.korisnickoIme,
        email: korisnik.email,
        ulogaId: korisnik.ulogaId,
      },
    };
  }

  async dohvatiMene(id: number) {
    return this.prisma.korisnik.findUnique({
      where: { korisnikId: id },
      select: {
        korisnikId: true,
        ime: true,
        prezime: true,
        korisnickoIme: true,
        email: true,
        ulogaId: true,
      },
    });
  }
}
