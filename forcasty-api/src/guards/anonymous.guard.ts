import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-anonymous';

export const AUTH_GUARD_ANONYMOUS = 'AUTH_GUARD_ANONYMOUS'

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, AUTH_GUARD_ANONYMOUS) {
  constructor() {
    super();
  }

  validate() {
    return {}
  }
}