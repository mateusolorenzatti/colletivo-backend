import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<void> {
        return this.authService.signUp(authSignUpDto)
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto)
    }

    @Get('/user')
    @UseGuards(AuthGuard())
    getUser(@Query('username') username: string): Promise<User>{
        return this.authService.getUser(username)
    }
}
