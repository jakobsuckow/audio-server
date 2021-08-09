import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateBlobDto } from "../blob/blob.dto";

import { AudioService } from "./audio.service";

@Controller("audio")
export class AudioController {
  constructor(private audioService: AudioService) {}
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async createBlob(@UploadedFile() blob: CreateBlobDto) {
    return await this.audioService.create(blob);
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.audioService.downloadAudio(id);
  }
}
