import {Module} from "@nestjs/common";
import {PrismaModule} from "../prisma/prisma.module";
import {ColumnService} from "./column.service";
import {ColumnController} from "./column.controller";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    controllers: [ColumnController],
    providers: [ColumnService],
    imports: [PrismaModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
        }),],
    exports: [ColumnService]
})
export class ColumnModule {}