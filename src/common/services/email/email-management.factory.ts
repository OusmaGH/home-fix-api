import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailInterface } from './dto/email.dto';
import { SMTPEmailManagement } from './email-management.service';

@Injectable()
export class EmailManagementFactory {
  private factories = new Map<string, new () => EmailInterface>();

  constructor() {
    this.factories.set('SMTP', SMTPEmailManagement);
  }

  createEmailService(transport: string): EmailInterface {
    const Factory = this.factories.get(transport);
    if (!Factory) {
      throw new InternalServerErrorException();
    }
    return new Factory();
  }
}
