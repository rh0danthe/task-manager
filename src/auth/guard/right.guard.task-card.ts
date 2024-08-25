import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { TaskCardService } from 'src/taskCard/task-card.service';

@Injectable()
export class RightGuardTaskCard implements CanActivate {
    constructor(private readonly taskService: TaskCardService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & { user: { sub: string } } = context
            .switchToHttp()
            .getRequest();

        const creatorId = Number(request.user.sub);

        const id = Number(request.param('id'));

        const card = await this.taskService.getById({ id });

        if (!card) {
            throw new ForbiddenException('Object not found.');
        }

        if (card.creatorId !== creatorId) {
            throw new ForbiddenException(
                'You do not have permission to perform this action.',
            );
        }

        return true;
    }
}
