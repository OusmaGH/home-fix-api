import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechniciansDto } from './dto/create-technician.dto';

@Controller('api/technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post('create')
  create(@Body() createTechniciansDto: CreateTechniciansDto) {
    return this.techniciansService.create(createTechniciansDto);
  }

  @Get('find')
  findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techniciansService.findOne(+id);
  }
}
