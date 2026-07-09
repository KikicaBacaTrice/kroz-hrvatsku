import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AzuriranjProfilDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  opisProfila?: string;
}
