import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PagingInput, PagingService } from '@app/paging';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private paging: PagingService,
  ) {}

  private readonly default_include = {
    _count: true,
    collections: true,
    brands: true,
  };

  create(createProductInput: CreateProductInput) {
    const { label, description, collections, brands } = createProductInput;
    return this.prisma.product.create({
      data: {
        label,
        description,
        collections: {
          connect: collections?.map((collectionId) => ({
            id: collectionId,
          })),
        },
        brands: {
          connect: brands?.map((brandId) => ({
            id: brandId,
          })),
        },
      },
      include: this.default_include,
    });
  }

  async findAll(paging: PagingInput) {
    const { take, skip, cursor } = this.paging.getPaged(paging);
    const collections = await this.prisma.product.findMany({
      take,
      skip,
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
      // include: { ...default_include },
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
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: this.default_include,
    });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    const { label, description, collections, brands } = updateProductInput;
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        label,
        description,
        collections: {
          set: collections?.map((collectionId) => ({
            id: collectionId,
          })),
        },
        brands: {
          set: brands?.map((brandId) => ({
            id: brandId,
          })),
        },
      },
      include: this.default_include,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
      include: this.default_include,
    });
  }
}
