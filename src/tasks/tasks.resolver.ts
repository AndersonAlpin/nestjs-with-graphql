import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './schema/task.schema';
import {
  CreateTaskInput,
  FindTaskInput,
  UpdateTaskInput,
} from './inputs/task.input';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/user/schema/user.schema';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Task], { name: 'tasks' })
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  async findOne(@Args('input') input: FindTaskInput) {
    return await this.tasksService.findOne(input);
  }

  @Mutation(() => Task)
  async createTask(
    @Args('input', new ValidationPipe()) input: CreateTaskInput,
  ) {
    return await this.tasksService.create(input);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('input', new ValidationPipe()) input: UpdateTaskInput,
  ) {
    return await this.tasksService.update(input);
  }

  @Mutation(() => String)
  async removeTask(@Args('input') input: FindTaskInput) {
    return await this.tasksService.remove(input);
  }

  @ResolveField(() => User)
  async user(@Parent() task: Task) {
    return this.usersService.findOne({ id: task.userId });
  }
}
