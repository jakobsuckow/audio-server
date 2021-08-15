import { PartialType } from "@nestjs/mapped-types";
export class CreateImageDto {
  fieldname: string;
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
