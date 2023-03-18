import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export enum UserRoles {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  address: z
    .object({
      addressLine1: z.string(),
      addressLine2: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
    })
    .optional(),
  role: z.nativeEnum(UserRoles),
  phoneNo: z.string().optional(),
});
export class CreateUserDto extends createZodDto(UserSchema) {}

// export type IUser = z.infer<typeof UserSchema>;
