import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateBrandInput {
  @Field({
    nullable: false,
  })
  label: string;

  @Field()
  description: string;

  @Field(() => [Int])
  products?: number[];
}
