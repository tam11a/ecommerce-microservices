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
  private readonly default_include = {
    _count: true,
    products: true,
  };

  create(createCollectionInput: CreateCollectionInput) {
    const { label, description, products } = createCollectionInput;
    return this.prisma.collection.create({
      data: {
        label,
        description,
        products: {
          connect: products?.map((productId) => ({
            id: productId,
          })),
        },
      },
      include: this.default_include,
    });
  }

  async findAll(paging: PagingInput) {
    const { take, skip, cursor } = this.paging.getPaged(paging);
    const collections = await this.prisma.collection.findMany({
      take,
      skip,
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
      include: this.default_include,
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
      include: this.default_include,
    });
  }

  update(id: number, updateCollectionInput: UpdateCollectionInput) {
    const { products, label, description } = updateCollectionInput;
    return this.prisma.collection.update({
      where: {
        id,
      },
      data: {
        label,
        description,
        products: {
          set: products?.map((productId) => ({
            id: productId,
          })),
        },
      },
      include: this.default_include,
    });
  }

  remove(id: number) {
    return this.prisma.collection.delete({
      where: {
        id,
      },
      include: this.default_include,
    });
  }
}
