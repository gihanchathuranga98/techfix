import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuoteItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quoteId: number;

  @Column()
  itemId: number;

  @Column()
  unitPrice: number;

  @Column()
  quantity: number;
}
