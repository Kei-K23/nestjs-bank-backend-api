import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private userRepository: Repository<UserEntity>;
  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
