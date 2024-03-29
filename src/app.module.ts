import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlobModule } from "./components/blob/blob.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudioModule } from "./components/audio/audio.module";
import { WatsonModule } from "./components/watson/watson.module";
import { WinstonModule } from "./components/winston/winston.module";
import { ImageModule } from "./components/image/image.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ["../dist/components/**/**.entity{.ts,.js}"],
      migrations: ["dist/migrations/**.js"],
      synchronize: process.env.NODE_ENV === "production" ? false : true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    WinstonModule.forRoot(),
    BlobModule,
    AudioModule,
    WatsonModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
