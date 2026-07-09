import { IsOptional, IsString, MaxLength } from 'class-validator';

export class DodajKategorijuDto {
  @IsString()
  @MaxLength(100)
  naziv!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  opis?: string;
}
