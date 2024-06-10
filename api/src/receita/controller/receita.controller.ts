import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { CreateReceitaDto, UpdateReceitaDto } from '../dto/receita.dto';
import { ReceitaService } from '../service/receita.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer-config';
import { Request } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('receitas')
@ApiTags('receitas')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova receita' })
  async create(@Body() createReceitaDto: CreateReceitaDto) {
    return this.receitaService.create(createReceitaDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Faz upload de uma imagem' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return {
      url: `${req.protocol}://${req.get('host')}/receitas/files/${file.filename}`,
    };
  }

  @Get('files/:file')
  @ApiOperation({ summary: 'Retorna a imagem da receita' })
  getFile(@Param('file') file: string) {
    const streamFile = createReadStream(join(process.cwd(), 'upload/files', file));
    return new StreamableFile(streamFile);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as receitas' })
  async findAll() {
    return this.receitaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma receita' })
  async findOne(@Param('id') id: number) {
    return this.receitaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma receita' })
  async update(
    @Param('id') id: number,
    @Body() updateReceitaDto: UpdateReceitaDto,
  ) {
    return this.receitaService.update(id, updateReceitaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma receita' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.receitaService.remove(id);
    return null;
  }
}
