import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '6ba55abf24e8ed87c2cfa8608a35c0df5f2b688954d7267ec1f9639132814aef9a2ce7b5ccc629c4fdcc1104a8a424a2c2d11d374d1e24f4fcdf504da1f13a501bca0032f973a5a252c2f1fccf6f834b916231c311d475ebe51e49b3b4e5534928490ebb9dc17d291da5aa379d69d58263ce091617f2ef79a305b7748d4a4af7a83b1e6b6ebaf6f197aa6495ecb43075b2f58c411708de03c89d9413494d13dadbd7a35d1122a7f77cb450a5702310cbae9fb9fd2b317d4db8c11b078c61d3eca5bfaf518c76288df3a0b678bf7a810d9f68698e8c85136131d60adfb314fad59e2d82223c30d0632adb917189f3eed324119e2d9a6b572e16f541986f7bd0',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
