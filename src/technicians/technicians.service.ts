import { Injectable } from '@nestjs/common';
import { CreateTechniciansDto } from './dto/create-technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Technician } from './entities/technician.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private readonly techniciansRepository: Repository<Technician>,
  ) {}

  async create(
    createTechniciansDto: CreateTechniciansDto,
  ): Promise<Technician[]> {
    const newTechnicians = createTechniciansDto.technicians.map((technician) =>
      this.techniciansRepository.create(technician),
    );
    return this.techniciansRepository.save(newTechnicians);
  }

  async findAll() {
    return await this.techniciansRepository.find();
  }

  async findOne(id: number) {
    return await this.techniciansRepository.findOneBy({ id });
  }
}
