import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        UserModule,
        AuthModule,
        ColumnModule,
        CommentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
