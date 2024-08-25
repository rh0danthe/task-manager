import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guard/auth.guard';
import { RightGuardColumn } from './guard/right.guard.column';
import { ColumnModule } from '../column/column.module';
import { RightGuardTaskCard } from './guard/right.guard.task-card';
import { TaskCardModule } from 'src/taskCard/task-card.module';

@Module({
    imports: [
        UserModule,
        ColumnModule,
        TaskCardModule,
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
    providers: [AuthService, AuthGuard, RightGuardColumn, RightGuardTaskCard],
    controllers: [AuthController],
})
export class AuthModule {}
