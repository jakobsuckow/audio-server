import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import { CreateBlobDto } from "../blob/blob.dto";
import { CreateFile } from "./s3.interface";

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get("AWS_ACCESSKEY_ID"),
      secretAccessKey: this.configService.get("AWS_ACCESSKEY_SECRET")
    });
    this.bucket = this.configService.get("AWS_BUCKET_NAME");
  }

  async uploadFile(file: CreateBlobDto): Promise<AWS.S3.PutObjectOutput> {
    const params = {
      Bucket: this.bucket,
      Key: `${String(file.fieldname)}.${file.mimetype.split("/")[1]}`,
      Body: file.buffer
    };
    return new Promise((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async downloadFile(file: CreateBlobDto): Promise<Buffer> {
    const params = {
      Bucket: this.bucket,
      Key: `${String(file.fieldname)}.${file.mimetype.split("/")[1]}`
    };
    return new Promise((resolve, reject) => {
      this.s3.getObject(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        if (!data.Body) {
          reject("Image not found on s3.");
        }
        resolve(Buffer.from(data.Body));
      });
    });
  }

  async deleteFile(file: CreateFile): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: this.bucket,
      Key: `${String(file.id)}.${file.mimetype.split("/")[1]}`
    };

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
