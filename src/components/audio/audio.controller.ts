import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { CreateBlobDto } from "../blob/blob.dto";
import { WatsonService } from "../watson/watson.service";
import { AudioEntity } from "./audio.entity";

import { AudioService } from "./audio.service";

@Controller("audio")
export class AudioController {
  constructor(private audioService: AudioService, private watsonService: WatsonService) {}
  @Post("")
  @UseInterceptors(FileInterceptor("file"))
  async createBlob(@UploadedFile() blob: CreateBlobDto) {
    return await this.audioService.create(blob);
  }

  @Get("all")
  async getAll(): Promise<AudioEntity[]> {
    return await this.audioService.listEntities();
  }

  @Get(":id")
  @Header("content-type", "audio/*")
  async getById(@Param("id") id: string, @Res() res: Response) {
    return res.send(await this.audioService.downloadAudio(id));
  }

  @Get(":id/transcribe")
  async transcribeAudio(@Param("id") id: string) {
    const buffer = await this.audioService.downloadAudio(id);
    return this.watsonService.transcribe(buffer);
  }
}
