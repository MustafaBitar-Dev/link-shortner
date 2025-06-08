import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../auth/entities/users.entity';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true})
  originalUrl: string;

  @Column({ unique: true })
  shortUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.links, { onDelete: 'CASCADE' })
  user: User;
  @Column({ type: 'uuid' })
  userId: string;

}
