import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class DodajLokacijaDto {
  @IsString()
  @MaxLength(200)
  naziv!: string;

  @IsOptional()
  @IsString()
  opis?: string;

  @IsString()
  @MaxLength(200)
  adresa!: string;

  @IsString()
  @MaxLength(200)
  grad!: string;

  @IsString()
  @MaxLength(200)
  zupanija!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  ulaznicaCijena?: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 6 })
  geoSirina!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 6 })
  geoDuzina!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  nagradaXp?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  nagradaValuta?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  dodaoKorisnikId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  kategorijaId!: number;
}
