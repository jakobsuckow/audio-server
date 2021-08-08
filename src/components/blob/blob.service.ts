import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BlobService } from "azure-storage";
import { CreateBlobDto } from "./blob.dto";
import { Readable } from "stream";
import intoStream from "into-stream";
import * as fs from "fs";

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
  async test(file: CreateBlobDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.blobService.createBlockBlobFromStream(
        "develop",
        file.originalname,
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

  async createFromStream(file: CreateBlobDto): Promise<any> {
    return new Promise((resolve, reject) => {
      const a = fs.createReadStream(file.buffer).pipe(
        this.blobService.createWriteStreamToBlockBlob("develop", file.fieldname, {
          blockIdPrefix: "block"
        })
      );
      console.log(a);
      resolve(a);
    });
  }
  async getOne() {
    return new Promise((resolve, reject) => {});
  }
}
