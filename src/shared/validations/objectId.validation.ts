import * as mongoose from 'mongoose';

export const validateObjectId = (value: string) => {
  return mongoose.Types.ObjectId.isValid(value);
};
