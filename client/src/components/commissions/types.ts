export interface CommissionOptions<TypeOptions extends boolean> {
  role: string;
  name: TypeOptions extends true
    ? "setterCommissionType" | "closerCommissionType"
    : "setterCommissionRate" | "closerCommissionRate";
}
