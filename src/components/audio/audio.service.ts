import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBlobDto } from "../blob/blob.dto";
import { AzureBlobService } from "../blob/blob.service";
import { AudioEntity } from "./audio.entity";

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
    readonly azureBlobService: AzureBlobService
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
}
