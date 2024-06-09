import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('receita')
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  anoPublicacao: number;

  @Column({ length: 100 })
  titulo: string;

  @Column('text')
  resumo: string;

  @Column('text', { nullable: true })
  picture: string;
}
