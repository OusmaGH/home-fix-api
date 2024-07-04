import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestsActionDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  service_type: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
