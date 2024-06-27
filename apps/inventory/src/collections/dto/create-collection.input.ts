import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCollectionInput {
  @Field({
    nullable: false,
  })
  label: string;

  @Field()
  description: string;
}
