import { Injectable } from '@nestjs/common';
import { CreateRequestsActionDto } from './dto/create-requests-action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestsAction } from './entities/requests-action.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RequestsActionService {
  constructor(
    @InjectRepository(RequestsAction)
    private readonly actionsRepository: Repository<RequestsAction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createRequestsActionDto: CreateRequestsActionDto,
    userId: number,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const action = this.actionsRepository.create({
      ...createRequestsActionDto,
      user,
    });

    await this.actionsRepository.save(action);
    return `saved to the db action with id: ${action.id}`;
  }

  async findAll() {
    return await this.actionsRepository.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    return await this.actionsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const action = await this.actionsRepository.findOneBy({ id });
    return await this.actionsRepository.remove(action);
  }
}
