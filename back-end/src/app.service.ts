import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './links/links.entity';  

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(Link)
      private readonly linkRepository: Repository<Link>,
    ){}

  getHello(req): string {
    return req.userId;
  }

  async getOriginalUrl(shortlUrl: string): Promise<string> {
    const link = await this.linkRepository.findOne({
      where: { shortUrl: 'http://localhost:3000/' + shortlUrl },
    });
    if (!link) {
      throw new Error('Short URL not found');
    }
    return link.originalUrl;
  }
}
