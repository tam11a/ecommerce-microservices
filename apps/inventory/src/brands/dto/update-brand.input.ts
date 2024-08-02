import { Field, Int } from '@nestjs/graphql';
import { CreateBrandInput } from './create-brand.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => Int)
  id: number;

  @Field()
  label?: string;

  @Field()
  description?: string;

  @Field(() => [Int])
  products?: number[];
}
