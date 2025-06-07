import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  expiredDate: Date;

  // Many refresh tokens belong to one user
  @ManyToOne(() => User, user => user.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;
} 
