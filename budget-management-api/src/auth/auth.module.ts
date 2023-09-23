import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from 'src/auth/strategy/at.strategy';
import { RtStrategy } from 'src/auth/strategy/rt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, ConfigService],
})
export class AuthModule {}
