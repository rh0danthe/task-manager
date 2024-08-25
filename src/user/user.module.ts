import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ColumnModule } from '../column/column.module';
import { TaskCardModule } from 'src/taskCard/task-card.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        PrismaModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
        ColumnModule,
        TaskCardModule,
        CommentModule
    ],
    exports: [UserService],
})
export class UserModule {}
