import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { AudioController } from "./audio.controller";
import { S3Service } from "../s3/s3.service";
import { S3Module } from "../s3/s3.module";

@Module({
  imports: [S3Module],
  providers: [AudioService],
  controllers: [AudioController]
})
export class AudioModule {}
