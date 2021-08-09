import { Module } from '@nestjs/common';
import { WatsonService } from './watson.service';

@Module({
  providers: [WatsonService]
})
export class WatsonModule {}
