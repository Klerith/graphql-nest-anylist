
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';

import { ListsService } from './lists.service';
import { ListItemService } from './../list-item/list-item.service';

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

import { List } from './entities/list.entity';
import { ListItem } from './../list-item/entities/list-item.entity';
import { User } from './../users/entities/user.entity';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { PaginationArgs, SearchArgs } from './../common/dto/args';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';

@Resolver(() => List)
@UseGuards( JwtAuthGuard )
export class ListsResolver {

  constructor(
    private readonly listsService: ListsService,
    private readonly listItemsService: ListItemService
  ) {}

  @Mutation(() => List)
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User
  ):Promise<List> {
    return this.listsService.create( createListInput, user );
  }

  @Query(() => [List], { name: 'lists' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ):Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs, searchArgs );
  }

  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.findOne( id, user );
  }

  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, user );
  }

  @Mutation(() => List)
  removeList(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ) {
    return this.listsService.remove( id, user );
  }

  @ResolveField( () => [ListItem], { name: 'items' } )
  async getListItems(
    @Parent() list: List,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ListItem[]> {

    return this.listItemsService.findAll( list, paginationArgs, searchArgs );
  }

  @ResolveField( () => Number, { name: 'totalItems' } )
  async countListItemsByList(
    @Parent() list: List,
  ): Promise<number> {
    return this.listItemsService.countListItemsByList( list );
  }

}
