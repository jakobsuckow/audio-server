import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { AudioController } from "./audio.controller";
import { BlobModule } from "../blob/blob.module";
import { AzureBlobService } from "../blob/blob.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudioEntity } from "./audio.entity";

@Module({
  imports: [BlobModule, TypeOrmModule.forFeature([AudioEntity])],
  providers: [AudioService, AzureBlobService],
  controllers: [AudioController]
})
export class AudioModule {}
