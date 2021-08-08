import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateBlobDto } from "./blob.dto";
import { AzureBlobService } from "./blob.service";

@Controller("blob")
export class BlobController {
  constructor(private blobService: AzureBlobService) {}
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  createBlob(@UploadedFile() file: CreateBlobDto) {
    return this.blobService.createFromBrowserFile(file);
  }

  @Get()
  async test() {
    // const test = this.blobService.createContainer("");
    // console.log(test)
    return "hi";
  }
}

// {
//   fieldname: 'file',
//   originalname: 'test',
//   encoding: '7bit',
//   mimetype: 'audio/webm',
//   buffer: <Buffer 1a 45 df a3 9f 42 86 81 01 42 f7 81 01 42 f2 81 04 42 f3 81 08 42 82 84 77 65 62 6d 42 87 81 04 42 85 81 02 18 53 80 67 01 ff ff ff ff ff ff ff 15 49 ... 11059 more bytes>,
//   size: 11109
// }
