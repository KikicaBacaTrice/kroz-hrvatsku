import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

export class AzurirajPostignuceDto {
  @IsString()
  @MaxLength(255)
  naziv?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  opis?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  brojPotrebnihLokacija?: number;

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
  kategorijaId?: number;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  dekoracijaId?: number | null;
}
