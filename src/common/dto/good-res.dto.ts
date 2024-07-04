import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class GoodResDto {
  @Expose()
  @IsString()
  statusCode: number;

  @Expose()
  @IsString()
  message: string;
}
