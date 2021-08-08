import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateBlobDto } from "./blob.dto";
import { AzureBlobService } from "./blob.service";

@Controller("blob")
export class BlobController {
  constructor(private blobService: AzureBlobService) {}
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async createBlob(@UploadedFile() file: CreateBlobDto) {
    return await this.blobService.createFromStream(file);
  }
}
