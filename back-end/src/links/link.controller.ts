import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkDto } from './dto/link.dto';
@Controller('links')
export class LinkController {

  
  constructor(private readonly linkService: LinkService) {}
    // Here I know is not good, but also send only the userId in the body doesnt seem a solution, I need to study more
    @Get(':userId')
    async findAll(@Param('userId') userId: string) {
      return this.linkService.findAll(userId);
    }
    // Same problem here
    @Get(':userId/:linkId')
    async findOne(@Param('userId') userId: string, @Param('linkId') linkId: string) {
      return this.linkService.findOne(userId, linkId);
    }

    @Post('create')
    async create(@Body() linkDto: LinkDto) {
      return this.linkService.create(linkDto);
    }

    @Patch(':linkId')
    async update(@Param('linkId') linkId: string, @Body() linkDto: LinkDto) {
      return this.linkService.update(linkId, linkDto);
    }

    @Delete(':linkId')
    async remove(@Param('linkId') linkId: string) {
      return this.linkService.remove(linkId);
    } 


}