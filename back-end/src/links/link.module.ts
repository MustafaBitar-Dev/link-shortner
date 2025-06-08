import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './links.entity';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
