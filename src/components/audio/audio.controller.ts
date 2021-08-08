import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ETag } from "aws-sdk/clients/s3";
import { CreateFile } from "../s3/s3.interface";
import { AudioService } from "./audio.service";

@Controller("audio")
export class AudioController {
  constructor(private audioService: AudioService) {}
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async createBlob(@UploadedFile() file: CreateFile) {
    const { ETag } = await this.audioService.create(file);
  }
}
