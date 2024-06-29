import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateProductInput {
  @Field({
    nullable: false,
  })
  label: string;

  @Field()
  description: string;

  @Field(() => [Int])
  collections?: number[];
}
