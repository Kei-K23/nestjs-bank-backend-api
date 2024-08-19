import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(userRequestDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, userRequestDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
