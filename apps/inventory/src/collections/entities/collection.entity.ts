import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({
    nullable: true,
  })
  description: string;

  @Field(() => Int, { nullable: true })
  parent_id: number;
}
