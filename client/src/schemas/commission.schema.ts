import { z } from "zod";

export const CommissionSchema = z.object({
  id: z.string(),
  commissionTypeId: z.string({
    required_error: "Please select commission type",
    invalid_type_error: "Please select commission type",
  }),
  commissionValue: z.string({
    required_error: "Please enter commission value",
    invalid_type_error: "Please enter commission value",
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ICommission = z.infer<typeof CommissionSchema>;
