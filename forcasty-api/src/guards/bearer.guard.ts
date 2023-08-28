import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as admin from 'firebase-admin';

export const AUTH_GUARD_BEARER = 'AUTH_GUARD_BEARER';

@Injectable()
export class BearerStrategy extends PassportStrategy(
  Strategy,
  AUTH_GUARD_BEARER,
) {
  constructor() {
    super();
  }

  async validate(token: any, done) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      done(null, decodedToken);
    } catch (error) {
      done(new UnauthorizedException(), false);
    }
  }
}
