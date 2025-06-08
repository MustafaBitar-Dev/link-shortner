import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RefreshToken } from './refresh-tokens.entity';
import { Link } from '../../links/links.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.userId)
  refreshTokens: RefreshToken[];
}
