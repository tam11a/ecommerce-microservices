import { Injectable } from '@nestjs/common';

export class PagingInput {
  first?: number;
  last?: number;
  after?: any;
  before?: any;
}

@Injectable()
export class PagingService {
  constructor() {}
  private readonly default_config = {
    limit: 10,
    skip: 0,
  };

  getPaged(paging: PagingInput) {
    const take = paging?.first
      ? paging?.first
      : paging?.last
        ? -1 * paging?.last
        : 10;
    const skip = paging?.after || paging?.before ? 1 : 0;
    const cursor = paging?.after || paging?.before;
    return { take, skip, cursor };
  }
}
