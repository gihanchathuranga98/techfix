import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  availableQty: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;

  @Column()
  discount: number;
}
