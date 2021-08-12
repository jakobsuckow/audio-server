import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerInterceptor } from "./components/winston/logger.interceptor";
import { WinstonService } from "./components/winston/winston.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonService()
  });
  app.enableCors();
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix("/api/v1");
  await app.listen(5000);
}
bootstrap();
