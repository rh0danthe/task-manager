import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskCardModule } from 'src/taskCard/task-card.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [CommentController],
    providers: [CommentService],
    imports: [
        PrismaModule,
        forwardRef(() => UserModule),
        forwardRef(() => TaskCardModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
    ],
    exports: [CommentService],
})
export class CommentModule {}
