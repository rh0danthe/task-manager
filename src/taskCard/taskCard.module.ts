import {Module} from "@nestjs/common";
import {PrismaModule} from "../prisma/prisma.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TaskCardController} from "./taskCard.controller";
import {TaskCardService} from "./taskCard.service";

@Module({
    controllers: [TaskCardController],
    providers: [TaskCardService],
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
    exports: [TaskCardService]
})
export class TaskCardModule {}