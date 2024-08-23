import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import {UserResponseDto} from "./dto/user-response.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(params: { data: UserResponseDto }): Promise<User> {
        const { data } = params;

        return this.prisma.user.create({
            name: dbUser.name,
            email: dbUser.email,
        });
    }

    async getById(params: {id: number}) : Promise<UserResponseDto> {
        const dbUser = await this.prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!dbUser) {
            throw new NotFoundException(`User with id ${params.id} does not exist`)
        }
        return dbUser;
    }

    async getByEmail(params: {email: string}) : Promise<User | null> {
        const dbUser = await this.prisma.user.findUnique({
            where: {
                email: params.email,
            },
        });
        if (!dbUser) {
            return null;
        }
        return dbUser;
    }
}