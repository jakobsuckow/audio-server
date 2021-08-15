import { Module } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ImageController } from "./image.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./image.entity";
import { BlobModule } from "../blob/blob.module";
import { WatsonService } from "../watson/watson.service";
import { WinstonService } from "../winston/winston.service";

@Module({
  imports: [BlobModule, TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, WinstonService]
})
export class ImageModule {}
