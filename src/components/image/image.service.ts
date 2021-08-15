import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AzureBlobService } from "../blob/blob.service";
import { WatsonService } from "../watson/watson.service";
import { WinstonService } from "../winston/winston.service";
import { CreateImageDto, UpdateImageDto } from "./image.dto";
import { Image } from "./image.entity";

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    readonly azureBlobService: AzureBlobService,
    readonly winstonService: WinstonService
  ) {}
  async create(createImageDto: CreateImageDto) {
    this.winstonService.log(createImageDto.fieldname);
    const res = await this.azureBlobService.createFromStream(createImageDto);
    if (res) {
      const savedEntity = await this.imageRepository.save(createImageDto);
      return savedEntity;
    }
  }

  async downloadAudio(id: string) {
    const entity = await this.imageRepository.findOne(id);
    return this.azureBlobService.downloadFileBuffer(
      `${String(entity.fieldname)}.${entity.mimetype.split("/")[1]}`
    );
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
