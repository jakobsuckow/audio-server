import { Injectable, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BlobService } from "azure-storage";
import { Blob, CreateBlobDto } from "./blob.dto";
import { Readable } from "stream";
import * as fs from "fs";
import { BlobEntity } from "./blob.entity";
import { WinstonService } from "../winston/winston.service";

@Injectable()
export class AzureBlobService {
  blobService: BlobService;
  constructor(private configService: ConfigService, private logger: WinstonService) {
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

  // async createFromBrowserFile(file: CreateBlobDto): Promise<BlobService.BlobResult> {
  //   return new Promise((resolve, reject) => {
  //     this.blobService.createBlockBlobFromBrowserFile(
  //       "develop",
  //       file.originalname,
  //       file,
  //       (error, result) => {
  //         if (error) reject(error);
  //         resolve(result);
  //       }
  //     );
  //   });
  // }
  async createFromStream(file: CreateBlobDto): Promise<BlobService.BlobResult> {
    this.logger.log(file.size.toString());
    return new Promise((resolve, reject) => {
      this.blobService.createBlockBlobFromStream(
        "develop",
        `${String(file.originalname)}.${file.mimetype.split("/")[1]}`,
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

  // async downloadFile(fileName: string): Promise<Buffer> {
  //   return new Promise((resolve, reject) => {
  //     this.blobService.getBlobToLocalFile("develop", fileName, fileName, (error, serverBlob) => {
  //       if (error) reject(error);
  //       fs.readFile(fileName, (err, data) => {
  //         if (err) reject(err);
  //         resolve(data);
  //         // fs.unlink(fileName, err => {
  //         //   if (err) {
  //         //     console.log(err);
  //         //   }
  //         // });
  //       });
  //     });
  //   });
  // }

  async downloadFileBuffer(fileName: string): Promise<any> {
    this.logger.log(fileName);
    return new Promise((resolve, reject) => {
      this.blobService.getBlobToStream(
        "develop",
        fileName,
        fs.createWriteStream(fileName),
        (error, serverBlob) => {
          if (error) reject(error);
          resolve(serverBlob);
        }
      );
      fs.unlink(fileName, err => {});
    });
  }

  async createURL(file: BlobEntity): Promise<string> {
    return `http://localhost:5000/api/v1/blob/${file.id}`;
  }
}
