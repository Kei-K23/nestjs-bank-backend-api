import { Controller, Post, Request } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req: AuthLoginDto) {
    return await this.authService.login(req);
  }
}
