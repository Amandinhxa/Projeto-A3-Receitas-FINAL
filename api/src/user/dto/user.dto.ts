import { IsEmail, IsString, Length, Matches } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(8, 40, { message: 'o tamanho minimo do nome é 8 caracteres' })
  @ApiProperty({ description: 'Nome do usuário' })
  nome: string;

  @IsEmail()
  @Length(8, 40, { message: 'o tamanho minimo do e-mail é 8 caracteres' })
  @ApiProperty({ description: 'E-mail do usuário' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'a senha deve ter pelo menos 8 caracteres, incluindo uma pelo menos: uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  @ApiProperty({ description: 'Senha do usuário' })
  senha: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
