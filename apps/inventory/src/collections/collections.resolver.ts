import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { PagingInput } from '@app/paging';

@Resolver('Collection')
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Mutation('createCollection')
  create(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.collectionsService.create(createCollectionInput);
  }

  @Query('collections')
  findAll(@Args('paging') paging: PagingInput) {
    return this.collectionsService.findAll(paging);
  }

  @Query('collection')
  findOne(@Args('id') id: number) {
    return this.collectionsService.findOne(id);
  }

  @Mutation('updateCollection')
  update(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionsService.update(
      updateCollectionInput.id,
      updateCollectionInput,
    );
  }

  @Mutation('removeCollection')
  remove(@Args('id') id: number) {
    return this.collectionsService.remove(id);
  }
}
