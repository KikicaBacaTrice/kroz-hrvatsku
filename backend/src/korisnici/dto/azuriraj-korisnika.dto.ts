import { IsEmail, IsOptional, IsString, Max, MaxLength } from 'class-validator';

export class AzurirajKorisnikaDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  ime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  prezime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  korisnickoIme?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;
}
