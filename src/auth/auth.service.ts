import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {UserSignInDto} from "./dto/user-sign-in.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {UserResponseDto} from "../user/dto/user-response.dto"
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(params:{
        data: UserRegisterDto}
    ): Promise<{ access_token: string }> {

        const { data } = params;

        const dbUser = await this.userService.getByEmailOrReturnNull({ email: data.email });

        if (!!dbUser) {
            throw new BadRequestException(`User with email ${data.email} already exists`)
        }

        data.password = bcrypt.hashSync(data.password, 10)


        const newUser = await this.userService.create({data});

        const payload = { sub: newUser.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    };

    async signIn(params:{
        data: UserSignInDto}
    ): Promise<{ access_token: string }> {
        const { data } = params;

        const dbUser = await this.userService.getByEmailOrReturnNull({ email: data.email });

        if (!dbUser) {
            throw new NotFoundException(`User with email ${data.email} does not exist`)
        }

        const isValidPassword = await bcrypt.compare(data.password, dbUser.password)

        if (!isValidPassword) {
            throw new UnauthorizedException();
        }

        const payload = { sub: dbUser.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}