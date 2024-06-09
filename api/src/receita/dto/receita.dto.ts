import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateReceitaDto {
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  anoPublicacao: number;

  @IsString()
  @Length(1, 100)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  resumo: string;

  @IsInt()
  userId: number;

  @IsString()
  picture: string;
}

export class UpdateReceitaDto extends PartialType(CreateReceitaDto) {}
