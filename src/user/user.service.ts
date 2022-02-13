import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validateObjectId } from 'src/shared/validations/objectId.validation';
import {
  FindUserInput,
  UpdateUserInput,
  CreateUserInput,
} from './inputs/user.input';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne({ id }: FindUserInput): Promise<User> {
    if (validateObjectId(id)) {
      const user = await this.userModel.findById(id).exec();

      if (user) {
        return user;
      }

      throw new NotFoundException('This user does not exist');
    } else {
      throw new BadRequestException('Invalid ObjectId');
    }
  }

  async create(userInput: CreateUserInput): Promise<User> {
    const user = new this.userModel(userInput);
    return await user.save();
  }

  async update({ id, ...input }: UpdateUserInput): Promise<User> {
    if (validateObjectId(id)) {
      const user = await this.userModel.findById(id).exec();

      if (user) {
        return await this.userModel.findByIdAndUpdate(
          { _id: id },
          { $set: input },
          { new: true },
        );
      }

      throw new NotFoundException('This user does not exist');
    } else {
      throw new BadRequestException('Invalid ObjectId');
    }
  }

  async remove({ id }: FindUserInput): Promise<string> {
    if (validateObjectId(id)) {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

      if (deletedUser) {
        return 'Successfully removed';
      }

      throw new NotFoundException('This user does not exist');
    } else {
      throw new BadRequestException('Invalid ObjectId');
    }
  }
}
