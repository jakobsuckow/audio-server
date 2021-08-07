import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const { Readable } = require("stream");
import azure, { BlobService } from "azure-storage";

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

  async createFromBrowserFile(file: Blob) {
    //@ts-ignore
    console.log(Readable.from(file.buffer.toString()));
    return this.blobService.createBlockBlobFromStream(
      "develop",
      "test",
      //@ts-ignore
      Readable.from(file.buffer.toString()),
      //@ts-ignore
      file.buffer.length,
      callback => {
        console.log("callback", callback);
      }
    );
  }
  async createOther(file: Blob) {}
}
