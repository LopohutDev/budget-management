import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './decorator/public.decorator';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RtGuard } from './guard';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto, @Headers() headers: any) {
    return this.authService.signin(dto, headers);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser('id') userId: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
