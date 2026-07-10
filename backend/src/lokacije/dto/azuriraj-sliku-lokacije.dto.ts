import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class AzurirajSlikuLokacijeDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  opisSlike?: string;

  @IsOptional()
  @IsBoolean()
  glavna?: boolean;
}
