import { Field, Int } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => Int)
  id: number;

  @Field()
  label?: string;

  @Field()
  description?: string;

  @Field(() => [Int])
  collections?: number[];
}
