import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RequestsActionService } from './requests-action.service';
import { CreateRequestsActionDto } from './dto/create-requests-action.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/get-current-user.decorator';

@Controller('api/requests-action')
export class RequestsActionController {
  constructor(private readonly requestsActionService: RequestsActionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @CurrentUser('userId') userId: any,
    @Body() createRequestsActionDto: CreateRequestsActionDto,
  ) {
    return this.requestsActionService.create(createRequestsActionDto, +userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('find')
  findAll() {
    return this.requestsActionService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsActionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsActionService.remove(+id);
  }
}
