import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateObjectId } from 'src/shared/validations/objectId.validation';
import {
  CreateTaskInput,
  FindTaskInput,
  UpdateTaskInput,
} from './inputs/task.input';
import { Task } from './schema/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne({ id }: FindTaskInput): Promise<Task> {
    if (validateObjectId(id)) {
      const task = await this.taskModel.findById(id).exec();

      if (task) {
        return task;
      }

      throw new NotFoundException('This task does not exist');
    } else {
      throw new BadRequestException('Invalid ObjectId');
    }
  }

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = new this.taskModel(createTaskInput);
    return await task.save();
  }

  async update({ id, ...input }: UpdateTaskInput): Promise<Task> {
    if (validateObjectId(id)) {
      const task = await this.taskModel.findById(id).exec();

      if (task) {
        return await this.taskModel.findByIdAndUpdate(
          { _id: id },
          { $set: input },
          { new: true },
        );
      }

      throw new NotFoundException('This task does not exist');
    } else {
      throw new BadRequestException('Invalid ObjectId');
    }
  }

  async remove({ id }: FindTaskInput): Promise<string> {
    if (validateObjectId(id)) {
      const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();

      if (deletedTask) {
        return 'Successfully removed';
      }

      throw new NotFoundException('This task does not exist');
    } else {
      throw new BadRequestException('Invalid ObjectId');
    }
  }
}
