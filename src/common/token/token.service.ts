import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenSevice {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: 'courseup123#',
      expiresIn: '1h',
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: 'courseup123@',
      expiresIn: '1h',
    });
  }

  async verifyAccessToken(token: any): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: 'courseup123#',
    });
  }

  async verifyRefreshToken(token: any): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: 'courseup123@',
    });
  }
}
