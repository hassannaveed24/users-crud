import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    role: { type: String },
    phoneNo: { type: String },
  },
  { timestamps: true },
);

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNo: string;
}
