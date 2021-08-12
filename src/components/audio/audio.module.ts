import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { AudioController } from "./audio.controller";
import { BlobModule } from "../blob/blob.module";
import { AzureBlobService } from "../blob/blob.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudioEntity } from "./audio.entity";
import { WatsonModule } from "../watson/watson.module";
import { WatsonService } from "../watson/watson.service";
import { WinstonModule } from "../winston/winston.module";

@Module({
  imports: [
    BlobModule,
    WatsonModule,
    TypeOrmModule.forFeature([AudioEntity]),
    WinstonModule.forRoot()
  ],
  providers: [AudioService, AzureBlobService, WatsonService],
  controllers: [AudioController]
})
export class AudioModule {}
