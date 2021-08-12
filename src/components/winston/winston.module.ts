import { DynamicModule } from '@nestjs/common';
import { createLoggerProviders } from './winston.provider';
import { WinstonService } from './winston.service';

export class WinstonModule {
  static forRoot(): DynamicModule {
    const loggerProviders = createLoggerProviders();
    return {
      module: WinstonModule,
      providers: [WinstonService, ...loggerProviders],
      exports: [WinstonService, ...loggerProviders]
    };
  }
}
