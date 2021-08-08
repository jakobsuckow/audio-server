import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BlobService } from "azure-storage";
import { CreateBlobDto } from "./blob.dto";
import { Readable } from "stream";

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

  async createFromStream(file: CreateBlobDto): Promise<BlobService.BlobResult> {
    return new Promise((resolve, reject) => {
      this.blobService.createBlockBlobFromStream(
        "develop",
        file.originalname,
        Readable.from(file.buffer.toString()),
        file.buffer.length,
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  }
}
