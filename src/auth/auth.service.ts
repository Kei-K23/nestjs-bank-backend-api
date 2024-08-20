import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(email: string, pass: string): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(email);
    const passwordVerify = argon2.verify(user.password, pass);
    if (user && passwordVerify) {
      return this.usersService.mapToUserResponseDto(user);
    }
    return null;
  }
}
