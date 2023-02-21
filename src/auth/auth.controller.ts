import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dtos/new-uset.dto';
import { AuthService } from './auth.service';
import { UserDetails } from 'src/user/user-details.interface';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verify(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
