import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateReceitaDto {
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @ApiProperty({ description: 'Ano de publicação da receita' })
  anoPublicacao: number;

  @IsString()
  @Length(1, 100)
  @ApiProperty({ description: 'Título da receita' })
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Resumo da receita' })
  resumo: string;

  @IsInt()
  @ApiProperty({ description: 'ID do usuário que criou a receita' })
  userId: number;

  @IsString()
  @ApiProperty({ description: 'URL da imagem da receita' })
  picture: string;
}

export class UpdateReceitaDto extends PartialType(CreateReceitaDto) {}
