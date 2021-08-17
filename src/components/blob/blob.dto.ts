export class Blob {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class CreateBlobDto {
  mimetype: string;
  originalname: string;
  buffer: Buffer;
}

export class UploadFileDTO {
  mimetype: string;
  originalname: string;
  buffer: Buffer;
}

export class DownloadFileDTO {
  mimetype: string;
  originalname: string;
}
