import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {Column} from '@prisma/client';
import {ColumnRequestDto} from "./dto/column-request.dto";
import {ColumnResponseDto} from "./dto/column-response.dto";

@Injectable()
export class ColumnService {
    constructor(private readonly prisma: PrismaService) { }

    async create(params: { data: ColumnRequestDto, creatorId: number }): Promise<ColumnResponseDto> {
        const { data, creatorId } = params;

        const dbColumn = await this.prisma.column.create({
            data: {
                title: data.title,
                creatorId
            },
        });

        return {id: dbColumn.id,
                title: dbColumn.title,
                creatorId: dbColumn.creatorId};
    }

    async getById(params: {id: number}) : Promise<ColumnResponseDto> {
        const { id } = params;

        const dbColumn = await this.prisma.column.findUnique({
            where: {
                id,
            },
        });

        if (!dbColumn) {
            throw new NotFoundException(`Column with id ${id} does not exist`)
        }

        return {id: dbColumn.id,
                title: dbColumn.title,
                creatorId: dbColumn.creatorId};
    }

    async getAllByCreatorId(params: { creatorId: number }): Promise<ColumnResponseDto[]> {
        const { creatorId } = params;

        const columns = await this.prisma.column.findMany({
            where: {
                creatorId,
            }
        });

        return columns.map((elem) => ({
            id: elem.id,
            title: elem.title,
            creatorId: elem.creatorId,
        }));
    }

    async update(params: {data: ColumnRequestDto, id: number}): Promise<ColumnResponseDto> {
        const { data, id } = params;

        let dbColumn = this.getById({id});

        const updatedColumn = await this.prisma.column.update({
            where: {
                id
            },
            data: {
                title: data.title
            },
        });

        return {id,
            title: updatedColumn.title,
            creatorId: updatedColumn.creatorId};
    }

    async delete(params: {id: number}): Promise<ColumnResponseDto>{
        const { id } = params;

        const deletedColumn = await this.prisma.column.delete({
            where: {
            id
            }
        });

        return {id,
            title: deletedColumn.title,
            creatorId: deletedColumn.creatorId};
    }

}