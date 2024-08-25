import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserRegisterDto } from '../auth/dto/user.register.dto';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from '../auth/dto/user-update.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

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

    async assertUserExists(params: { id: number }) {
        const { id } = params;

        const dbUser = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!dbUser) {
            throw new NotFoundException(`User with id ${id} does not exist`);
        }
    }

    async getById(params: { id: number }): Promise<UserDto> {
        const { id } = params;

        const dbUser = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!dbUser) {
            throw new NotFoundException(`User with id ${id} does not exist`);
        }

        return { id, name: dbUser.name, email: dbUser.email };
    }

    async getByEmailOrReturnNull(params: {
        email: string;
    }): Promise<User | null> {
        const { email } = params;

        const dbUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!dbUser) {
            return null;
        }

        return dbUser;
    }

    async update(params: {
        id: number;
        data: UserUpdateDto;
    }): Promise<UserDto> {
        const { data, id } = params;

        await this.assertUserExists({ id });

        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });

        return {
            id,
            name: updatedUser.name,
            email: updatedUser.email,
        };
    }
}
