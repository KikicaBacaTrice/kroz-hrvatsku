import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class DodajSlikuDto {
  @IsString()
  @MaxLength(255)
  putanjaSlike!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  opisSlike?: string;

  @IsOptional()
  @IsBoolean()
  glavna?: boolean;
}
