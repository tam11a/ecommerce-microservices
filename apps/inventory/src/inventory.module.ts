import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { CollectionsModule } from './collections/collections.module';
import { PrismaModule } from '@app/prisma';
import { PagingModule } from '@app/paging';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    PrismaModule,
    PagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
    }),
    CollectionsModule,
    ProductsModule,
    BrandsModule,
  ],
  controllers: [],
  providers: [],
})
export class InventoryModule {}
