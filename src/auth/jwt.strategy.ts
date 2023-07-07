import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log({ payload });
    const value = await this.cacheManager.get('key');
    console.log({ value });
    if (!value) {
      await this.cacheManager.set('key', 'value');
    }

    return { userId: payload.sub, username: payload.username };
  }
}
