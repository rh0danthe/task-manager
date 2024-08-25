import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {User} from '@prisma/client';
import {UserRegisterDto} from "../auth/dto/user-register.dto";
import {UserResponseDto} from "./dto/user-response.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(params: { data: UserRegisterDto }): Promise<User> {
        const { data } = params;

        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
    }

    async getById(params: {id: number}) : Promise<UserResponseDto> {
        const { id } = params;

        const dbUser = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!dbUser) {
            throw new NotFoundException(`User with id ${id} does not exist`)
        }

        return {name: dbUser.name,
        email: dbUser.email};
    }

    async getByEmailOrReturnNull(params: {email: string}) : Promise<User | null> {
        const { email } = params;

        const dbUser = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!dbUser) {
            return null;
        }

        return dbUser;
    }
}