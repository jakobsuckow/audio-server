import { Module } from "@nestjs/common";
import { AzureBlobService } from "./blob.service";

@Module({
  controllers: [],
  providers: [AzureBlobService],
  exports: [AzureBlobService]
})
export class BlobModule {}
