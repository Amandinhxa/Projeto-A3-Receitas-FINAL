import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceitaDto, UpdateReceitaDto } from '../dto/receita.dto';
import { Receita } from '../entity/receita.entity';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  async create(createReceitaDto: CreateReceitaDto): Promise<CreateReceitaDto> {
    const receita = this.receitaRepository.create(createReceitaDto);
    return this.receitaRepository.save(receita);
  }

  async findAll(): Promise<Receita[]> {
    return this.receitaRepository.find();
  }

  async findOne(id: number): Promise<Receita> {
    const receita = await this.receitaRepository.findOne({
      where: { id },
    });
    if (!receita) {
      throw new NotFoundException(`Receita de ID ${id} não encontrado`);
    }
    return receita;
  }

  async update(
    id: number,
    updateReceitaDto: UpdateReceitaDto,
  ): Promise<Receita> {
    const receita = await this.receitaRepository.preload({
      id,
      ...updateReceitaDto,
    });
    if (!receita) {
      throw new NotFoundException(`Receita de ID ${id} não encontrado`);
    }
    return this.receitaRepository.save(receita);
  }

  async remove(id: number): Promise<void> {
    await this.receitaRepository.delete(id);
  }
}
