import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.arg';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  
  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidRolesArgs
  ):Promise<User[]> {
    return this.usersService.findAll( validRoles.roles );
  }

  @Query(() => User, { name: 'user' })
  findOne( @Args('id', { type: () => ID }) id: string ): Promise<User> {
    // TODO: 
    throw new Error('No implementado');
    // return this.usersService.findOne(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  blockUser( 
    @Args('id', { type: () => ID }) id: string 
  ): Promise<User> {
    return this.usersService.block(id);
  }
}
