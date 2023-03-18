import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { UserRoles } from '../schemas/user.schema';

const UserSchema = z.object({
  _id: z.string(),
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
