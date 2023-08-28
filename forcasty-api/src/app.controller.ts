import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_GUARD_ANONYMOUS } from 'guards/anonymous.guard';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard([AUTH_GUARD_ANONYMOUS]))
  getHello(): string {
    return 'Hello World!';
  }
}
