import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistracijaDto {
  @IsString()
  @MaxLength(50)
  ime!: string;

  @IsString()
  @MaxLength(50)
  prezime!: string;

  @IsString()
  @MaxLength(50)
  korisnickoIme!: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  lozinka!: string;

  @IsInt()
  ulogaId!: number;
}
