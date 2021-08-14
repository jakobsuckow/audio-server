import { Module } from "@nestjs/common";
import { WinstonModule } from "../winston/winston.module";
import { WinstonService } from "../winston/winston.service";
import { AzureBlobService } from "./blob.service";

@Module({
  imports: [WinstonModule.forRoot()],
  controllers: [],
  providers: [AzureBlobService],
  exports: [AzureBlobService]
})
export class BlobModule {}
