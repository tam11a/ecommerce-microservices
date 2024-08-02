import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { PagingInput, PagingService } from '@app/paging';
import { PrismaService } from '@app/prisma';

@Injectable()
export class BrandsService {
  constructor(
    private prisma: PrismaService,
    private paging: PagingService,
  ) {}
  private readonly default_include = {
    _count: true,
    products: true,
  };

  create(createBrandInput: CreateBrandInput) {
    const { label, description, products } = createBrandInput;
    return this.prisma.brand.create({
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
    const brands = await this.prisma.brand.findMany({
      take,
      skip,
      cursor: cursor ? { id: parseInt(cursor) } : undefined,
      include: this.default_include,
    });

    return {
      pageInfo: {
        hasNextPage: brands.length === (paging?.first || paging?.last || 10),
        hasPreviousPage: !!paging?.after,
        startCursor: brands.length ? brands[0].id.toString() : null,
        endCursor: brands.length
          ? brands[brands.length - 1].id.toString()
          : null,
      },
      edges: brands.map((brand) => ({
        cursor: brand.id.toString(),
        node: brand,
      })),
    };
  }

  findOne(id: number) {
    return this.prisma.brand.findUnique({
      where: { id },
      include: this.default_include,
    });
  }

  update(id: number, updateBrandInput: UpdateBrandInput) {
    const { label, description, products } = updateBrandInput;
    return this.prisma.brand.update({
      where: { id },
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

  remove(id: number) {
    return this.prisma.brand.delete({
      where: { id },
      include: this.default_include,
    });
  }
}
