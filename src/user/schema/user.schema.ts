import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
