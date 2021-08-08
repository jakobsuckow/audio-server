import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BlobService } from "azure-storage";
import { CreateBlobDto } from "./blob.dto";

@Injectable()
export class AzureBlobService {
  blobService: BlobService;
  constructor(private configService: ConfigService) {
    this.blobService = new BlobService(
      "DefaultEndpointsProtocol=https;AccountName=5minutesdevelop;AccountKey=IfcT1ls6ipDe+E+mSLrB/+jN3GZ9DZju47DXF/hoxlFua2SJG7e8IqVMBIIxE4VgO+7wDaRmZlW3H5DVh04YsQ==;EndpointSuffix=core.windows.net"
    );
  }
  async createContainer(containerName: string) {
    return this.blobService.createContainerIfNotExists("staging", (error, result) => {
      console.log(error);
      console.log(result);
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
  async createOther(file: Blob) {}
}
