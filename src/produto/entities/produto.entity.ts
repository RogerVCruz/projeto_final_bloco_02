import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  quantidade: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  preco: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ type: 'varchar', length: 5000 })
  @ApiProperty()
  foto: string;

  @Column({ type: 'boolean', nullable: false })
  @ApiProperty()
  generico: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Categoria })
  categoria: Categoria;
}
