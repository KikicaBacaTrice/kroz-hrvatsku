import { IsInt, Min } from 'class-validator';

export class AzurirajNovacDto {
  @IsInt()
  @Min(0)
  virtualniNovac!: number;
}
