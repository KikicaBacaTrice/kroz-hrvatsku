import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class DodajDekoracijuDto {
  @IsString()
  @MaxLength(100)
  naziv!: string;

  @IsString()
  @MaxLength(255)
  opis!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  cijenaVaulta?: number;

  @IsString()
  @MaxLength(255)
  slikaDekoracije!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  tipDekoracijeId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  nacinOtkljucavanjaId!: number;
}
