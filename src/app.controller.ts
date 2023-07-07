import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AzureADGuard } from './auth/azure-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(AzureADGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AzureADGuard)
  @Get('nothing')
  getBlock(): string {
    return 'nothing';
  }

  @UseGuards(AzureADGuard)
  @Get('whatever')
  getWhatever(): string {
    return 'whatever';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
