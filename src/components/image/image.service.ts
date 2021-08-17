import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AzureBlobService } from "../blob/blob.service";
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
    try {
      const res = await this.azureBlobService.upload(createImageDto);
      if (res) {
        const savedEntity = await this.imageRepository.save(createImageDto);
        return savedEntity;
      }
    } catch (error) {
      this.winstonService.log("error asd");
      this.winstonService.error(error, "");
    }
  }

  async downloadAudio(id: string) {
    const entity = await this.imageRepository.findOne(id);
    return this.azureBlobService.download(entity);
  }

  async findAll(): Promise<any> {
    return await this.imageRepository.find();
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
