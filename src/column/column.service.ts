import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColumnDto } from './dto/column.dto';
import { mapToColumnDto } from './mappers/column.mapper';
import { ColumnUpdateDto } from './dto/column.update.dto';
import { ColumnCreateDto } from './dto/column.create.dto';

@Injectable()
export class ColumnService {
    constructor(private readonly prisma: PrismaService) {}

    async create(params: {
        data: ColumnCreateDto;
        creatorId: number;
    }): Promise<ColumnDto> {
        const { data, creatorId } = params;

        const dbColumn = await this.prisma.column.create({
            data: { title: data.title, creatorId },
        });

        return mapToColumnDto(dbColumn);
    }

    async assertColumnExists(params: { id: number }) {
        const { id } = params;

        const dbColumn = await this.prisma.column.findUnique({
            where: { id },
        });

        if (!dbColumn) {
            throw new NotFoundException(`Column with id ${id} does not exist`);
        }
    }

    async getById(params: { id: number }): Promise<ColumnDto> {
        const { id } = params;

        const dbColumn = await this.prisma.column.findUnique({
            where: { id },
        });

        if (!dbColumn) {
            throw new NotFoundException(`Column with id ${id} does not exist`);
        }

        return mapToColumnDto(dbColumn);
    }

    async getAllByCreatorId(params: {
        creatorId: number;
    }): Promise<ColumnDto[]> {
        const { creatorId } = params;

        const columns = await this.prisma.column.findMany({
            where: {
                creatorId,
            },
        });

        return columns.map(mapToColumnDto);
    }

    async update(params: {
        data: ColumnUpdateDto;
        id: number;
    }): Promise<ColumnDto> {
        const { data, id } = params;

        await this.assertColumnExists({ id });

        const updatedColumn = await this.prisma.column.update({
            where: {
                id,
            },
            data: {
                title: data.title,
            },
        });

        return mapToColumnDto(updatedColumn);
    }

    async delete(params: { id: number }): Promise<ColumnDto> {
        const { id } = params;

        await this.assertColumnExists({ id });

        const deletedColumn = await this.prisma.column.delete({
            where: {
                id,
            },
        });

        return mapToColumnDto(deletedColumn);
    }
}
