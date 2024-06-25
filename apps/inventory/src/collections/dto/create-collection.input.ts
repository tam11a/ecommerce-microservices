import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field()
  name: string;

  @Field({
    nullable: true,
  })
  description: string;

  @Field(() => Int, { nullable: true })
  parent_id: number;
}
