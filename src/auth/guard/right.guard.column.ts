import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import {ColumnService} from "../../column/column.service";

@Injectable()
export class RightGuardColumn implements CanActivate {
    constructor(
        private readonly columnService: ColumnService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & { user: { sub: string } }  = context.switchToHttp().getRequest();

        const creatorId = Number(request.user.sub);

        const id = Number(request.param('id'));

        const column = await this.columnService.getById({ id });

        if (!column) {
            throw new ForbiddenException('Object not found.');
        }

        if (column.creatorId !== creatorId) {
            throw new ForbiddenException('You do not have permission to perform this action.');
        }

        return true;
    }
}
