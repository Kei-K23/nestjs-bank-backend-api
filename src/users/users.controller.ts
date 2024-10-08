import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser() user: any): Promise<UserResponseDto> {
    return this.usersService.findById(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me')
  async updateMe(
    @GetUser() user: any,
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(user.userId, userRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async deleteMe(@GetUser() user: any) {
    this.usersService.delete(user.userId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Post()
  @HttpCode(201)
  async create(
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(userRequestDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userRequestDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, userRequestDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
