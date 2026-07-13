import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class AktivirajDekoracijuDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  dekoracijaId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pozicijaPrikaza!: number;
}
