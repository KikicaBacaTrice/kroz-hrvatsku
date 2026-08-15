import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AzuriranjProfilDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  ime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  prezime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  korisnickoIme?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  opisProfila?: string;
}
