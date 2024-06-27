import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { PrismaService } from '@app/prisma';
import { PagingInput, PagingService } from '@app/paging';

@Injectable()
export class CollectionsService {
  constructor(
    private prisma: PrismaService,
    private paging: PagingService,
  ) {}
  private readonly default_include = {};

  create(createCollectionInput: CreateCollectionInput) {
    return this.prisma.collection.create({
      data: {
        ...createCollectionInput,
      },
    });
  }

  async findAll(paging: PagingInput) {
    const { take, skip, cursor } = this.paging.getPaged(paging);
    const collections = await this.prisma.collection.findMany({
      take,
      skip,
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
      // include: { ...default_include },
    });

    return {
      pageInfo: {
        hasNextPage:
          collections.length === (paging?.first || paging?.last || 10),
        hasPreviousPage: !!paging?.after,
        startCursor: collections.length ? collections[0].id.toString() : null,
        endCursor: collections.length
          ? collections[collections.length - 1].id.toString()
          : null,
      },
      edges: collections.map((collection) => ({
        cursor: collection.id.toString(),
        node: collection,
      })),
    };
  }

  findOne(id: number) {
    return this.prisma.collection.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCollectionInput: UpdateCollectionInput) {
    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        ...updateCollectionInput,
      },
    });
  }

  remove(id: number) {
    return this.prisma.collection.delete({
      where: {
        id,
      },
    });
  }
}
