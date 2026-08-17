import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class DeaktivirajTipDekoracijeDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tipDekoracijeId!: number;
}
