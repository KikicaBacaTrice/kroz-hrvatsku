import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class PrijavaDto {
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  lozinka!: string;
}
