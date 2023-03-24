export const commissions = [
  {
    id: "clc5y85ep000008lbeg83ayon",
    commissionName: "Percent of Cash Collected",
    commissionType: "SETTER",
    commissionUnit: "%",
    comTypeDescription: "Only pay when you receive cash",
  },
  {
    id: "clc5y8r2s000108lb96jv91gp",
    commissionName: "Percent of Total Deal Value",
    commissionType: "SETTER",
    commissionUnit: "%",
    comTypeDescription: "Pay for the total deal value up front",
  },
  {
    id: "clc5y987a000208lb9ia42iip",
    commissionName: "Flat Rate Per Deal Closed",
    commissionType: "SETTER",
    commissionUnit: "$",
    comTypeDescription: "Pay a fixed rate for every deal",
  },
  {
    id: "clc5y9mov000308lbd4yudaq7",
    commissionName: "Flat Rate Per Appointment Set",
    commissionType: "CLOSER",
    commissionUnit: "$",
    comTypeDescription: "Fixed rate for each sales call booked",
  },
] as const;

export type ICommissionType = typeof commissions[number];
export type ICommissionTypeId = typeof commissions[number]["id"];

export const percentageCommissionIds = commissions.filter((e) => e.commissionUnit == "%").map((e) => e.id);

export const getIsPercentageCommission = (id: string) => percentageCommissionIds.includes(id as ICommissionTypeId);
