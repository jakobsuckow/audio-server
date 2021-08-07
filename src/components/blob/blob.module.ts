import { Module } from '@nestjs/common';
import { BlobController } from './blob.controller';
import { AzureBlobService } from './blob.service';

@Module({
  controllers: [BlobController],
  providers: [AzureBlobService],
})
export class BlobModule {}
