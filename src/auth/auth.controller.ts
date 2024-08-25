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
import { UserSignInDto } from './dto/user.sign-in.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from './guard/auth.guard';
import { TokenDto } from './dto/token.dto';

@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenDto,
    })
    @Post('signIn')
    signIn(@Body() dto: UserSignInDto) {
        return this.authService.signIn({
            data: dto,
        });
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenDto,
    })
    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.authService.register({
            data: dto,
        });
    }

    @ApiOkResponse({
        type: UserDto,
    })
    @Patch('credentials')
    @UseGuards(AuthGuard)
    async update(@Req() req, @Body() dto: UserUpdateDto): Promise<UserDto> {
        const id = req.user.sub;

        return this.authService.update({ id, data: dto });
    }
}
