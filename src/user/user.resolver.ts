import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  FindUserInput,
  UpdateUserInput,
  CreateUserInput,
} from './inputs/user.input';
import { User } from './schema/user.schema';
import { UsersService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('input') input: FindUserInput) {
    return await this.usersService.findOne(input);
  }

  @Mutation(() => User)
  async createUser(
    @Args('input', new ValidationPipe()) input: CreateUserInput,
  ) {
    return await this.usersService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input', new ValidationPipe()) input: UpdateUserInput,
  ) {
    return await this.usersService.update(input);
  }

  @Mutation(() => String)
  async removeUser(@Args('input') input: FindUserInput) {
    return await this.usersService.remove(input);
  }
}
