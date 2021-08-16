import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBlobDto } from "../blob/blob.dto";
import { AzureBlobService } from "../blob/blob.service";
import { AudioEntity } from "./audio.entity";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { Readable } from "stream";
import { WatsonService } from "../watson/watson.service";

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
    readonly azureBlobService: AzureBlobService,
    private watsonService: WatsonService
  ) {}

  // TODO: Should be createAudioDTO

  async create(blob: CreateBlobDto) {
    const res = await this.azureBlobService.upload(blob);
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
}
