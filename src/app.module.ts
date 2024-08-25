import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {AuthModule} from "./auth/auth.module";
import {PrismaModule} from "./prisma/prisma.module";
import {UserModule} from "./user/user.module";
import {ColumnModule} from "./column/column.module";

@Module({
  imports: [ConfigModule.forRoot(),
            PrismaModule,
            UserModule,
            AuthModule,
            ColumnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
