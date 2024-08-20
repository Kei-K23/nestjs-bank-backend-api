import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(email);

    const passwordVerify = await argon2.verify(user.password, pass);
    if (user && passwordVerify) {
      return this.usersService.mapToUserResponseDto(user);
    }
    return null;
  }

  async login(user: AuthLoginDto) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) {
      throw new UnauthorizedException('User credential is not correct');
    }

    const payload = {
      email: validatedUser.email,
      sub: validatedUser.id,
      role: validatedUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
