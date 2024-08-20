import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRequestDto } from './dto/user-request.dto';
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

  async findByEmail(email: string): Promise<UserEntity> {
    const [user] = await this.userRepository.findBy({ email });
    return user;
  }

  async create(userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    // Hash the user password
    const hashedPassword = await argon2.hash(userRequestDto.password);
    userRequestDto.password = hashedPassword;
    console.log(userRequestDto);

    return this.mapToUserResponseDto(
      await this.userRepository.save(userRequestDto),
    );
  }

  async update(
    id: string,
    userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    if (userRequestDto.password) {
      userRequestDto.password = await argon2.hash(userRequestDto.password);
    }
    // Perform the update operation
    await this.userRepository.update(id, userRequestDto);

    // Retrieve the updated user
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapToUserResponseDto(updatedUser);
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  mapToUserResponseDto(userEntity: UserEntity): UserResponseDto {
    const userResponseDto = new UserResponseDto(userEntity);
    return userResponseDto;
  }
}
