import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() req: AuthRegisterDto) {
    return await this.authService.register(req);
  }

  @Post('/login')
  async login(@Body() req: AuthLoginDto) {
    return await this.authService.login(req);
  }
}
