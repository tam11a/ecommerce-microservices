import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';

@Injectable()
export class CollectionsService {
  create(createCollectionInput: CreateCollectionInput) {
    console.log(createCollectionInput);
    return { ...createCollectionInput, id: 2 };
  }

  findAll() {
    return `This action returns all collections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionInput: UpdateCollectionInput) {
    console.log(id, updateCollectionInput);
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
