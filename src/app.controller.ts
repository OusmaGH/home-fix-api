import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    console.log('Hello World!');
    return this.appService.getHello();
  }

  @Get('health')
  checkHealth(): { status: string } {
    return { status: 'App is running' };
  }
}
