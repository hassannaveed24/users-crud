import * as mongoose from 'mongoose';

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}
export interface User {
  _id: string;
  name: string;
  email: string;
  address?: Address;
  role: UserRoles;
  phoneNo?: string;
}
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});
export const UserSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: { type: addressSchema },
    role: { type: String, enum: UserRoles },
    phoneNo: { type: String },
  },
  { timestamps: true },
);
