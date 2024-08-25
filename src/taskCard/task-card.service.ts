import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskCardCreateRequestDto } from './dto/task-card.create-request.dto';
import { TaskCardResponseDto } from './dto/task-card.response.dto';
import { TaskCardUpdateRequestDto } from './dto/task-card.update-request.dto';
import { mapToTaskCardDto } from './mappers/task-card.mapper';
import { ColumnService } from 'src/column/column.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskCardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly columnService: ColumnService,
        private readonly userService: UserService
    ) {}

    async create(params: {
        data: TaskCardCreateRequestDto;
        creatorId: number;
        columnId: number;
    }): Promise<TaskCardResponseDto> {
        const { data, creatorId, columnId } = params;

        await this.columnService.getById({id: columnId});

        const dbCard = await this.prisma.taskCard.create({
            data: {
                title: data.title,
                content: data.content,
                creatorId,
                columnId,
            },
        });

        return mapToTaskCardDto(dbCard);
    }

    async getById(params: { id: number }): Promise<TaskCardResponseDto> {
        const { id } = params;


        const dbCard = await this.prisma.taskCard.findUnique({
            where: {
                id,
            },
        });

        if (!dbCard) {
            throw new NotFoundException(
                `TaskCard with id ${id} does not exist`,
            );
        }

        return mapToTaskCardDto(dbCard);
    }

    async getAllByCreatorId(params: {
        creatorId: number;
    }): Promise<TaskCardResponseDto[]> {
        const { creatorId } = params;

        await this.userService.getById({id: creatorId});

        const cards = await this.prisma.taskCard.findMany({
            where: {
                creatorId,
            },
        });

        return cards.map(mapToTaskCardDto);
    }

    async getAllByColumnId(params: {
        columnId: number;
    }): Promise<TaskCardResponseDto[]> {
        const { columnId } = params;

        await this.columnService.getById({id: columnId});

        const cards = await this.prisma.taskCard.findMany({
            where: {
                columnId,
            },
        });

        return cards.map(mapToTaskCardDto);
    }

    async update(params: {
        data: TaskCardUpdateRequestDto;
        id: number;
    }): Promise<TaskCardResponseDto> {
        const { data, id } = params;

        await this.getById({ id });

        const updatedCard = await this.prisma.taskCard.update({
            where: {
                id,
            },
            data: {
                title: data.title,
                content: data.content,
            },
        });

        return mapToTaskCardDto(updatedCard);
    }

    async delete(params: { id: number }): Promise<TaskCardResponseDto> {
        const { id } = params;

        await this.getById({ id });

        const deletedCard = await this.prisma.taskCard.delete({
            where: {
                id,
            },
        });

        return mapToTaskCardDto(deletedCard);
    }

    async takeCard(params: { id: number; userId: number }): Promise<Boolean> {
        const { id, userId } = params;

        await this.getById({ id });

        const result = await this.prisma.taskCard.update({
            where: { id },
            data: {
                users: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return !!result;
    }

    async giveUpCard(params: { id: number; userId: number }): Promise<boolean> {
        const { id, userId } = params;

        await this.getById({ id });

        const result = await this.prisma.taskCard.update({
            where: { id },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });

        return !!result;
    }

    async getCardsByUserExecuting(params: { userId: number }) {
        const { userId } = params;
        
        await this.userService.getById({ id: userId });

        const cards = await this.prisma.taskCard.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        });

        return cards.map(mapToTaskCardDto);
    }
}
