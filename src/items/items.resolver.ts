import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

import { ItemsService } from './items.service';

import { Item } from './entities/item.entity';
import { User } from './../users/entities/user.entity';

import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Item)
@UseGuards( JwtAuthGuard )
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, { name: 'createItem' })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.create( createItemInput, user );
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {

    return this.itemsService.findAll( user, paginationArgs, searchArgs );
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.findOne(id, user );
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() user: User
  ):Promise<Item> {
    return this.itemsService.update( updateItemInput.id, updateItemInput, user );
  }

  @Mutation(() => Item)
  removeItem(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.remove(id, user);
  }
}
