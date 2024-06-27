import { Field, Int } from '@nestjs/graphql';
import { CreateCollectionInput } from './create-collection.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field(() => Int)
  id: number;

  @Field()
  label?: string;

  @Field()
  description?: string;
}
