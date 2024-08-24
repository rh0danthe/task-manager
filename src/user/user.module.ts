import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {PrismaModule} from "../prisma/prisma.module";
import {UserController} from "./user.controller";
import {PrismaService} from "../prisma/prisma.service";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [PrismaModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            global: true,
            secret: config.getOrThrow('JWT_SECRET'),
            signOptions: { expiresIn: '7d' },
        }),
    }),],
    exports: [UserService]
})
export class UserModule {}