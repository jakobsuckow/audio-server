import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlobModule } from "./components/blob/blob.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BlobModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
