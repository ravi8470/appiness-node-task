import mongoose, { Schema } from 'mongoose';

export const RoleSchema = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    description: {
      type: String,
    }
  },
  {
    collection: 'roles',
    versionKey: false
  }
);


export const RoleModel = mongoose.model('Role', RoleSchema);