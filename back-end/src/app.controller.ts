import { Controller, Get, UseGuards, Req, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from './guards/auth.guard';

// @UseGuards(AuthGuard) // I wanted to do something with token
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    return this.appService.getHello(req);
  }

  @Get('url/:shortlUrl')
  async shortUrl(@Param('shortlUrl') shortlUrl: string, @Res() res): Promise<void> {
    const originalUrl = await this.appService.getOriginalUrl(shortlUrl);
    res.redirect(originalUrl);
  }
}
