import { IsOptional, IsString } from 'class-validator';

export class FiltrirajLokacijeDto {
  @IsOptional()
  @IsString()
  grad?: string;

  @IsOptional()
  @IsString()
  zupanija?: string;

  @IsOptional()
  @IsString()
  kategorija?: string;

  @IsOptional()
  @IsString()
  pretraziNaziv?: string;
}
