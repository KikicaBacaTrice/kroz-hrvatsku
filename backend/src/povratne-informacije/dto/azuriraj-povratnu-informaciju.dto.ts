import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class AzurirajPovratnuInformacijuDto {
  @IsString()
  @MaxLength(1000)
  tekst?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  ocjena?: number;
}
