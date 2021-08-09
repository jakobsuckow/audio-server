import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BlobService } from "azure-storage";
import { Blob, CreateBlobDto } from "./blob.dto";
import { Readable } from "stream";
import * as fs from "fs";
import { BlobEntity } from "./blob.entity";

@Injectable()
export class AzureBlobService {
  blobService: BlobService;
  constructor(private configService: ConfigService) {
    this.blobService = new BlobService(this.configService.get<string>("AZURE_URI"));
  }
  async createContainer(containerName: string): Promise<BlobService.ContainerResult> {
    return new Promise((resolve, reject) => {
      this.blobService.createContainerIfNotExists(containerName, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

  async createFromBrowserFile(file: CreateBlobDto): Promise<BlobService.BlobResult> {
    return new Promise((resolve, reject) => {
      console.log(file);
      this.blobService.createBlockBlobFromBrowserFile(
        "develop",
        file.originalname,
        file,
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  }
  async createFromStream(file: CreateBlobDto): Promise<BlobService.BlobResult> {
    return new Promise((resolve, reject) => {
      this.blobService.createBlockBlobFromStream(
        "develop",
        `${String(file.fieldname)}.${file.mimetype.split("/")[1]}`,
        Readable.from(file.buffer),
        file.buffer.length,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  }

  async createFromLocalFile(file: CreateBlobDto): Promise<BlobService.BlobResult> {
    return new Promise((resolve, reject) => {
      this.blobService.createBlockBlobFromLocalFile(
        "develop",
        file.originalname,
        "",
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  }

  async getOne(fileName: string) {
    return new Promise((resolve, reject) => {
      this.blobService.getBlobToStream(
        "develop",
        fileName,
        fs.createWriteStream("/tmp"),
        (error, serverBlob) => {
          if (error) reject(error);
          resolve(serverBlob);
        }
      );
    });
  }

  async createURL(file: BlobEntity): Promise<string> {
    return `http://localhost:5000/api/v1/blob/${file.id}`;
  }
}
