import { ConfigService } from '@nestjs/config';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_RT_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: { sub: string; email: string }) {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      ...user,
      refreshToken,
    };
  }
}
