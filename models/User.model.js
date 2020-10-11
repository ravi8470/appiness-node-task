import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      bcrypt: true
    },
    role: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'users',
    versionKey: false
  }
);


UserSchema.plugin(bcrypt);

export const UserModel =  mongoose.model('User', UserSchema);