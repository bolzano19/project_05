import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Metric } from './Metric';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  address!: string;

  @Column()
  status!: boolean;

  @OneToMany(() => Metric, metric => metric.station)
  metrics!: Metric[];
}

