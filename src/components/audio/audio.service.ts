import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBlobDto } from "../blob/blob.dto";
import { AzureBlobService } from "../blob/blob.service";
import { AudioEntity } from "./audio.entity";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { Readable, Stream } from "stream";
import { WatsonService } from "../watson/watson.service";
import { Lame } from "node-lame";
import * as Ffmpeg from "fluent-ffmpeg";
import { WinstonService } from "../winston/winston.service";

@Injectable()
export class AudioService {
  lame: Lame;
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
    readonly azureBlobService: AzureBlobService,
    private watsonService: WatsonService,
    private logger: WinstonService
  ) {
    this.lame = new Lame({ output: "buffer", bitrate: 320 });
  }

  // TODO: Should be createAudioDTO

  async create(blob: CreateBlobDto) {
    const mp3 = await this.toMp3(blob.buffer);
    const newFile = {
      ...blob,
      buffer: mp3
    };
    const res = await this.azureBlobService.upload(newFile);
    if (res) {
      const savedEntity = await this.audioRepository.save(blob);
      return savedEntity;
    }
  }

  async downloadAudio(id: string) {
    const entity = await this.audioRepository.findOne(id);
    return this.azureBlobService.download(entity);
  }

  async listEntities(): Promise<AudioEntity[]> {
    return await this.audioRepository.find();
  }

  async transcribe(id: string) {
    const buffer = await this.downloadAudio(id);
    return this.watsonService.transcribe(buffer);
  }

  // Utlities

  async getDuration(stream: Readable): Promise<number> {
    return await getAudioDurationInSeconds(stream);
  }

  async toMp3(buffer: Buffer): Promise<Buffer> {
    const encoder = this.lame.setBuffer(buffer);
    const res = await encoder.encode();
    if (res) {
      return encoder.getBuffer();
    }
  }

  async ffmpegToMp3(stream: Readable) {
    return Ffmpeg(stream)
      .format("mp3")
      .save("./test.mp3");
  }
}
