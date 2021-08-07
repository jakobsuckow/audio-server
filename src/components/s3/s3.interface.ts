export interface File {
  id: string;
  originalname?: string;
  encoding?: string;
  mimetype: string;
  size?: number;
}

export interface CreateFile extends File {
  buffer: Buffer;
}
