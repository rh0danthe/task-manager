import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { TaskCardService } from 'src/taskCard/task-card.service';
import { CommentDto } from './dto/comment.dto';
import { mapToCommentDto } from './mappers/comment.mapper';
import { CommentCreateDto } from './dto/comment.create.dto';
import { CommentUpdateDto } from './dto/comment.update.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly taskService: TaskCardService,
        private readonly userService: UserService,
    ) {}

    async create(params: {
        data: CommentCreateDto;
        creatorId: number;
        taskcardId: number;
    }): Promise<CommentDto> {
        const { data, creatorId, taskcardId } = params;

        await this.taskService.assertTaskCardExists({ id: taskcardId });

        const dbComment = await this.prisma.comment.create({
            data: {
                content: data.content,
                creatorId,
                taskcardId,
            },
        });

        return mapToCommentDto(dbComment);
    }

    async getById(params: { id: number }): Promise<CommentDto> {
        const { id } = params;

        const dbComment = await this.prisma.comment.findUnique({
            where: {
                id,
            },
        });

        if (!dbComment) {
            throw new NotFoundException(`Comment with id ${id} does not exist`);
        }

        return mapToCommentDto(dbComment);
    }

    async getAllByCreatorId(params: {
        creatorId: number;
    }): Promise<CommentDto[]> {
        const { creatorId } = params;

        await this.userService.assertUserExists({ id: creatorId });

        const comments = await this.prisma.comment.findMany({
            where: {
                creatorId,
            },
        });

        return comments.map(mapToCommentDto);
    }

    async getAllByTaskCardId(params: {
        taskcardId: number;
    }): Promise<CommentDto[]> {
        const { taskcardId } = params;

        await this.taskService.assertTaskCardExists({ id: taskcardId });

        const comments = await this.prisma.comment.findMany({
            where: {
                taskcardId,
            },
        });

        return comments.map(mapToCommentDto);
    }

    async assertCommentExists(params: { id: number }) {
        const { id } = params;

        const dbComment = await this.prisma.comment.findUnique({
            where: {
                id,
            },
        });

        if (!dbComment) {
            throw new NotFoundException(`Comment with id ${id} does not exist`);
        }
    }

    async update(params: {
        data: CommentUpdateDto;
        id: number;
    }): Promise<CommentDto> {
        const { data, id } = params;

        await this.assertCommentExists({ id });

        const updatedComment = await this.prisma.comment.update({
            where: {
                id,
            },
            data: {
                content: data.content,
            },
        });

        return mapToCommentDto(updatedComment);
    }

    async delete(params: { id: number }): Promise<CommentDto> {
        const { id } = params;

        await this.assertCommentExists({ id });

        const deletedComment = await this.prisma.comment.delete({
            where: {
                id,
            },
        });

        return mapToCommentDto(deletedComment);
    }
}
