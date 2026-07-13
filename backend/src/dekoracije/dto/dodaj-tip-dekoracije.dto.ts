import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class DodajTipDekoracijeDto {
  @IsString()
  @MaxLength(100)
  naziv!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxAktivnih!: number;
}
