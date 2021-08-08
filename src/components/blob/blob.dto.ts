export class Blob {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class CreateBlobDto extends Blob {
  buffer: Buffer;
}
