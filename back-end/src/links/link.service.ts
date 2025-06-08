import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './links.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LinkDto } from './dto/link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ){}

  async findAll(userId: string) {
    const userLinks = await this.linkRepository.find({
      where: { userId },
    });
    return userLinks;
  }

  async findOne(userId: string, linkId: string) {
    const link = await this.linkRepository.findOne({
      where: { id: linkId, userId },
    });
    if (!link) {
      throw new Error('Link not found');
    }
    return link;
  } 

  async create(linkDto: LinkDto) {
    const { originalUrl, userId } = linkDto;
    const shortUrl = Math.random().toString(36).substring(2, 8);
    const newLink = this.linkRepository.create({
      originalUrl,
      shortUrl: shortUrl,
      userId,
    });
    return await this.linkRepository.save(newLink);
  }

  async update(linkId: string, linkDto: LinkDto) {
    await this.linkRepository.update(linkId, linkDto);
    return this.findOne(linkDto.userId, linkId);
  }

  async remove(linkId: string) {
    const link = await this.linkRepository.findOne({ where: { id: linkId } });
    if (!link) {
      throw new Error('Link not found');
    }
    await this.linkRepository.remove(link);
    return { message: 'Link deleted successfully' };
  }
}