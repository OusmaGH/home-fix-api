import { Module } from '@nestjs/common';
import { RequestsActionService } from './requests-action.service';
import { RequestsActionController } from './requests-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsAction } from './entities/requests-action.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestsAction, User])],
  controllers: [RequestsActionController],
  providers: [RequestsActionService],
})
export class RequestsActionModule {}
