import { IsEnum, IsEmail, IsString, IsNotEmpty, ValidateNested, FormikValidatorBase } from "formik-class-validator";

interface Address {
  _id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface IUser {
  index?: number;
  _id: string;
  name: string;
  email: string;
  address?: Address;
  phoneNo?: string;
  role?: UserRoles;
  createdAt?: string;
  updatedAt?: string;
}

class AddressDto {
  @IsString()
  addressLine1: string = "";

  @IsString()
  addressLine2: string = "";

  @IsString()
  city: string = "";

  @IsString()
  state: string = "";

  @IsString()
  country: string = "";
}

export class UserDto extends FormikValidatorBase {
  @IsString()
  @IsNotEmpty({ message: "Id should not be empty" })
  _id: string = "";

  @IsString()
  @IsNotEmpty({ message: "Name should not be empty" })
  name: string = "";

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: "Email should not be empty" })
  email: string = "";

  @ValidateNested(() => AddressDto, {})
  address = new AddressDto();

  @IsEnum(UserRoles)
  @IsNotEmpty({ message: "Role should not be empty" })
  role: UserRoles = UserRoles.MEMBER;

  @IsString()
  phoneNo?: string;
}
