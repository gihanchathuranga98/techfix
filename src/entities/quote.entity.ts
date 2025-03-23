import { QuoteStatusEnum } from 'src/quote-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  supplier: number;

  @Column({ default: QuoteStatusEnum.PENDING })
  status: QuoteStatusEnum;

  @Column()
  discount: number;
}
