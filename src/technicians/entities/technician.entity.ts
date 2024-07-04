import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Technician extends AbstractEntity<Technician> {
  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column({ default: true })
  availability: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
