import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Station } from './Station';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  temperature!: number;

  @Column()
  dose_rate!: number;

  @Column()
  humidity!: number;

  @ManyToOne(() => Station, station => station.metrics)
  station!: Station;
}
