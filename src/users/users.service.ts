import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/user-create.dto';
import * as argon2 from 'argon2';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private userRepository: Repository<UserEntity>;
  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<UserResponseDto[]> {
    return (await this.userRepository.find()).map((user) =>
      this.mapToUserResponseDto(user),
    );
  }

  async findById(id: string): Promise<UserResponseDto> {
    const [user] = await this.userRepository.findBy({ id });
    return this.mapToUserResponseDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Hash the user password
    const hashedPassword = await argon2.hash(createUserDto.password);
    createUserDto.password = hashedPassword;

    return this.mapToUserResponseDto(this.userRepository.create(createUserDto));
  }

  private mapToUserResponseDto(userEntity: UserEntity): UserResponseDto {
    const userResponseDto = new UserResponseDto(userEntity);
    return userResponseDto;
  }
}
