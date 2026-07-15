import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class AzurirajDekoracijuDto {
  @IsString()
  @MaxLength(100)
  naziv?: string;

  @IsString()
  @MaxLength(255)
  opis?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  cijenaValuta?: number;

  @IsString()
  @MaxLength(255)
  slikaDekoracija?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  tipDekoracijeId?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  nacinOtkljucavanjaId?: number;
}
