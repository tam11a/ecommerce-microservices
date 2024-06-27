import { Global, Module } from '@nestjs/common';
import { PagingService } from './paging.service';

@Global()
@Module({
  providers: [PagingService],
  exports: [PagingService],
})
export class PagingModule {}
