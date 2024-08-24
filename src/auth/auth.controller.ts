import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserSignInDto} from "./dto/user-sign-in.dto";
import {UserRegisterDto} from "./dto/user-register.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() dto: UserSignInDto) {

        return this.authService.signIn({
            data: dto});
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.authService.register({
            data: dto});
    }
}