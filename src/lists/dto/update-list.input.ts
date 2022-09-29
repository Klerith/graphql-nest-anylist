import { CreateListInput } from './create-list.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;

}
