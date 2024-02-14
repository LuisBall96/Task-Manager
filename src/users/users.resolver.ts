import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { UserRoles } from '../auth/enum/user-types.enum';
import { UserRolesArgs } from './dto/args/roles.arg';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('signupInput') signupInput: SignupInput) {
    return this.usersService.create(signupInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() userRolesArgs: UserRolesArgs
  ) : Promise <User[]> {
    return this.usersService.findAll(userRolesArgs.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string): Promise <User> {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'user' })
  findOneByEmail(@Args('email', { type: () => String }) email: string): Promise <User> {
    return this.usersService.findOneByEmail(email);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise <User> {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string): Promise <User> {
    return this.usersService.remove(id);
  }
  
}
