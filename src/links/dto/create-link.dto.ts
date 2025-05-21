import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  shortedUrl: string;
}
