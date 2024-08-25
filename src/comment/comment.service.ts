import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { TaskCardService } from 'src/taskCard/task-card.service';
import { CommentRequestDto } from './dto/comment-request.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly taskService: TaskCardService,
        private readonly userService: UserService
    ) {}

    async create(params: {
        data: CommentRequestDto;
        creatorId: number;
        taskcardId: number;
    }): Promise<CommentResponseDto> {
        const { data, creatorId, taskcardId} = params;

        await this.taskService.getById({id: taskcardId});

        const dbComment = await this.prisma.comment.create({
            data: {
                content: data.content,
                creatorId,
                taskcardId
            },
        });

        return dbComment;
    }

    async getById(params: { id: number }): Promise<CommentResponseDto> {
        const { id } = params;


        const dbComment = await this.prisma.comment.findUnique({
            where: {
                id,
            },
        });

        if (!dbComment) {
            throw new NotFoundException(
                `Comment with id ${id} does not exist`,
            );
        }

        return dbComment;
    }

    async getAllByCreatorId(params: {
        creatorId: number;
    }): Promise<CommentResponseDto[]> {
        const { creatorId } = params;

        await this.userService.getById({id: creatorId});

        const comments = await this.prisma.comment.findMany({
            where: {
                creatorId,
            },
        });

        return comments;
    }

    async getAllByTaskCardId(params: {
        taskcardId: number;
    }): Promise<CommentResponseDto[]> {
        const { taskcardId } = params;

        await this.taskService.getById({id: taskcardId});

        const comments = await this.prisma.comment.findMany({
            where: {
                taskcardId,
            },
        });

        return comments;
    }

    async update(params: {
        data: CommentRequestDto;
        id: number;
    }): Promise<CommentResponseDto> {
        const { data, id } = params;

        await this.getById({ id });

        const updatedComment = await this.prisma.comment.update({
            where: {
                id,
            },
            data: {
                content: data.content,
            },
        });

        return updatedComment;
    }

    async delete(params: { id: number }): Promise<CommentResponseDto> {
        const { id } = params;

        await this.getById({ id });

        const deletedComment = await this.prisma.comment.delete({
            where: {
                id,
            },
        });

        return deletedComment;
    }

}
