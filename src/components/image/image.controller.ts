import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Header,
  Res
} from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateImageDto, UpdateImageDto } from "./image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(FileInterceptor("image"))
  @Post()
  create(@UploadedFile() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(":id")
  @Header("content-type", "image/*")
  async getById(@Param("id") id: string, @Res() res: Response) {
    return res.send(await this.imageService.downloadAudio(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imageService.remove(+id);
  }
}
