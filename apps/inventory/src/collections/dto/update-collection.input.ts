import { CreateCollectionInput } from './create-collection.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field(() => Int)
  id: number;

  @Field({
    nullable: true,
  })
  name: string;

  @Field({
    nullable: true,
  })
  description: string;

  @Field({
    nullable: true,
  })
  parent_id: number;
}
