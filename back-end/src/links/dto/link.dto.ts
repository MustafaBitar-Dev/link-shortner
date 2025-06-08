import { IsNotEmpty, IsString } from 'class-validator';

export class LinkDto {
  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @IsString()
  shortUrl?: string;

  @IsNotEmpty()
  userId: string;
}