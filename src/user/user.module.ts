import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {PrismaModule} from "../prisma/prisma.module";
import {UserController} from "./user.controller";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [PrismaModule],
    exports: [UserService]
})
export class UserModule {}