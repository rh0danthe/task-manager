import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from 'src/comment/comment.service';
@Injectable()
export class RightGuardComment implements CanActivate {
    constructor(private readonly commentService: CommentService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & { user: { sub: string } } = context
            .switchToHttp()
            .getRequest();

        const creatorId = Number(request.user.sub);

        const id = Number(request.params['id']);

        const comment = await this.commentService.getById({ id });

        if (!comment) {
            throw new ForbiddenException('Object not found.');
        }

        if (comment.creatorId !== creatorId) {
            throw new ForbiddenException(
                'You do not have permission to perform this action.',
            );
        }

        return true;
    }
}
