import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserService } from 'src/user/user.service';

@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    signIn(@Body() dto: UserSignInDto) {
        return this.authService.signIn({
            data: dto,
        });
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.authService.register({
            data: dto,
        });
    }

    @ApiOkResponse({
        type: UserResponseDto,
    })
    @Patch("credentials")
    @UseGuards(AuthGuard)
    async update(
        @Req() req,
        @Body() dto: UserUpdateDto,
    ): Promise<UserResponseDto> {
        const id = req.user.sub;

        return this.authService.update({ id, data: dto });
    }
}
