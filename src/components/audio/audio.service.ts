import { Injectable } from "@nestjs/common";
import { CreateFile } from "../s3/s3.interface";
import { S3Service } from "../s3/s3.service";

@Injectable()
export class AudioService {
  constructor(private s3Service: S3Service) {}

  async create(file: CreateFile) {
    return this.s3Service.uploadFile(file);
  }
  async getById(id: string) {
    return this.s3Service.downloadFile(id);
  }
}
