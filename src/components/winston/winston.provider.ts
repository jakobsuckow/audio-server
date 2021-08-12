import { Provider } from "@nestjs/common";
import { contextsForLoggers } from "./winston.decorator";
import { WinstonService } from "./winston.service";

function loggerFactory(logger: WinstonService, context: string) {
  if (context) logger.setContext(context);
  return logger;
}

function createLoggerProvider(context: string): Provider<WinstonService> {
  return {
    provide: `LoggerService${context}`,
    useFactory: logger => loggerFactory(logger, context),
    inject: [WinstonService]
  };
}

export function createLoggerProviders(): Array<Provider<WinstonService>> {
  return contextsForLoggers.map(context => createLoggerProvider(context));
}
