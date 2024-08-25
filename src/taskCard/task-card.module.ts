import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskCardController } from './task-card.controller';
import { TaskCardService } from './task-card.service';
import { UserModule } from 'src/user/user.module';
import { ColumnModule } from 'src/column/column.module';

@Module({
    controllers: [TaskCardController],
    providers: [TaskCardService],
    imports: [
        PrismaModule,
        forwardRef(() => ColumnModule),
        forwardRef(() => UserModule),
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
    exports: [TaskCardService],
})
export class TaskCardModule {}
