import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WinstonService } from './winston.service';

const logger = new WinstonService();
logger.setContext('LoggerInterceptor');

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    logger.log(`${request.url}`);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        logger.log(`${request.url} - ${Date.now() - now}ms`);
      })
    );
  }
}
