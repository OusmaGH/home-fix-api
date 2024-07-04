import { InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailBodyDto, EmailInterface } from './dto/email.dto';

export class SMTPEmailManagement implements EmailInterface {
  private transporter: any;

  constructor() {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new InternalServerErrorException();
    }
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(mail: EmailBodyDto): Promise<any> {
    return await this.transporter.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  }
}
