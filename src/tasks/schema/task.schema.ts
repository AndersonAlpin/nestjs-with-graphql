import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema()
@ObjectType()
export class Task {
  @Field()
  _id: string;

  @Prop()
  @Field()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Field(() => User)
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
