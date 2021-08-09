import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Blob, CreateBlobDto } from "../blob/blob.dto";
import { AzureBlobService } from "../blob/blob.service";
import { AudioEntity } from "./audio.entity";

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
    readonly azureBlobService: AzureBlobService
  ) {}

  async create(blob: CreateBlobDto) {
    const res = await this.azureBlobService.createFromStream(blob);
    console.log(res);
    const savedEntity = await this.audioRepository.save(blob);

    return this.createURL(savedEntity);
  }

  async downloadAudio(id: string) {
    const entity = await this.audioRepository.findOne(id);
    return this.azureBlobService.downloadFile(
      `${String(entity.fieldname)}.${entity.mimetype.split("/")[1]}`
    );
  }

  async createURL(entity: AudioEntity) {
    return {
      ...entity,
      url: `http://localhost:5000/api/v1/audio/${entity.id}`
    };
  }
}
