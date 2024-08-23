import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {UserSignInDto} from "./dto/user-sign-in.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {UserResponseDto} from "../user/dto/user-response.dto";
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(params:{
        req: UserRegisterDto}
    ): Promise<{ access_token: string }> {

        const dbUser = await this.userService.getByEmail({ email: params.req.email });

        if (!!dbUser) {
            throw new BadRequestException(`User with email ${params.req.email} already exists`)
        }

        const newUser = await this.userService.create({data: params.req});

        const payload = { sub: newUser.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    };

    async signIn(params:{
        req: UserSignInDto}
    ): Promise<{ access_token: string }> {

        const dbUser = await this.userService.getByEmail({ email: params.req.email });

        if (!dbUser) {
            throw new NotFoundException(`User with email ${params.req.email} does not exist`)
        }

        if (dbUser.password !== params.req.password) {
            throw new UnauthorizedException();
        }

        const payload = { sub: dbUser.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}