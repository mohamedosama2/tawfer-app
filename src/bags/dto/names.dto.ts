import { IsNotEmpty, IsString } from 'class-validator';

export class NamesDto {
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  nameAr: string;
}
