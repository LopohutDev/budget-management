import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Tokens, User } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash,
        },
      });

      user.hash = '';
      user.hashedRt = '';
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto, headers: any) {
    const user = await this.validateUser(dto);

    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    // const rtMatches = await argon.verify(user.hashedRt, rt);
    // if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async validateUser(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwdMatched = await argon.verify(user.hash, dto.password);
    if (!pwdMatched) throw new ForbiddenException('Credentials incorrect');
    return user;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, user: User): Promise<Tokens> {
    const payload = {
      sub: userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '30m',
        secret: this.config.get('JWT_SECRET'),
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get('JWT_RT_SECRET'),
      }),
    };
  }
}
