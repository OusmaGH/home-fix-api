import { IsString } from 'class-validator';

export class EmailBodyDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;

  @IsString()
  html: string;
}

export interface EmailInterface {
  sendMail(mail: EmailBodyDto): Promise<any>;
}
