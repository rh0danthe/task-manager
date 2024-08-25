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
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from './guard/auth.guard';
import { TokenDto } from './dto/token.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in a user' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully signed in',
        type: TokenDto,
    })
    @Post('signIn')
    signIn(@Body() dto: UserSignInDto) {
        return this.authService.signIn({
            data: dto,
        });
    }

    @ApiOperation({ summary: 'Register a new user' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully registered',
        type: TokenDto,
    })
    @Post('register')
    register(@Body() dto: UserRegisterDto) {
        return this.authService.register({
            data: dto,
        });
    }

    @ApiOperation({ summary: 'Update user credentials' })
    @ApiOkResponse({
        description: 'Successfully updated user credentials',
        type: UserDto,
    })
    @Patch('credentials')
    @UseGuards(AuthGuard)
    async update(@Req() req, @Body() dto: UserUpdateDto): Promise<UserDto> {
        const id = req.user.sub;

        return this.authService.update({ id, data: dto });
    }
}
