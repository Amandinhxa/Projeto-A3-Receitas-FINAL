import { Module } from '@nestjs/common';
import { ReceitaService } from './service/receita.service';
import { ReceitaController } from './controller/receita.controller';
import { Receita } from './entity/receita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  providers: [ReceitaService],
  controllers: [ReceitaController]
})
export class ReceitaModule {}
