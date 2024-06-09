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

@Controller('receitas')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Post()
  async create(@Body() createReceitaDto: CreateReceitaDto) {
    return this.receitaService.create(createReceitaDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return {
      url: `${req.protocol}://${req.get('host')}/receitas/files/${file.filename}`,
    };
  }

  @Get('files/:file')
  getFile(@Param('file') file: string) {
    const streamFile = createReadStream(join(process.cwd(), 'upload/files', file));
    return new StreamableFile(streamFile);
  }

  @Get()
  async findAll() {
    return this.receitaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.receitaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReceitaDto: UpdateReceitaDto,
  ) {
    return this.receitaService.update(id, updateReceitaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.receitaService.remove(id);
    return null;
  }
}
