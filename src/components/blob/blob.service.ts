import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WinstonService } from "../winston/winston.service";
import { BlobClient, BlobServiceClient, BlobUploadCommonResponse } from "@azure/storage-blob";
import { DownloadFileDTO, UploadFileDTO } from "./blob.dto";

@Injectable()
export class AzureBlobService {
  blobService: BlobServiceClient;
  constructor(private configService: ConfigService, private logger: WinstonService) {
    this.blobService = BlobServiceClient.fromConnectionString(this.configService.get("AZURE_URI"));
  }

  // General

  async upload(file: UploadFileDTO): Promise<BlobUploadCommonResponse> {
    const fileName: string = `${file.originalname}.${file.mimetype.split("/")[1]}`;
    this.logger.log(fileName);
    const containerClient = this.blobService.getContainerClient("develop");
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    return await blockBlobClient.uploadData(file.buffer);
  }

  async download(file: DownloadFileDTO): Promise<Buffer> {
    const fileName: string = `${file.originalname}.${file.mimetype.split("/")[1]}`;
    this.logger.log(fileName);
    const containerClient = this.blobService.getContainerClient("develop");
    const blobClient: BlobClient = containerClient.getBlobClient("screenshot.png.png");
    const downloadBlockBlobResponse = await blobClient.download();
    return this.streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
  }

  // Utiliites

  private async streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", data => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }
}
