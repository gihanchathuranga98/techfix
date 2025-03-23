import { UserTypesEnum } from 'src/enums/user-types.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // auto generating id
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: UserTypesEnum;

  @Column({ default: true })
  isActive: boolean;
}
