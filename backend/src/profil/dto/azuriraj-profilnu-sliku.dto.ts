import { IsString, MaxLength } from 'class-validator';

export class AzuriranjProfilnuSlikuDto {
  @IsString()
  @MaxLength(255)
  url!: string;
}
