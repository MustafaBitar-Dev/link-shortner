import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './auth/entities/refresh-tokens.entity';

@Module({
   imports: [
    JwtModule.register({
      global: true,
      secret: "123",
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mustafa',
      password: 'admin',
      database: 'link-shortner',
      entities: [User, RefreshToken],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
