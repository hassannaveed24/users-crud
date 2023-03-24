import { commissions } from "@/data/commission/commission-types.data";
import { FocusEventHandler } from "react";
import { ActionMeta, OnChangeValue } from "react-select";

type Commission = typeof commissions[number];

export interface CommissionSelectProps {
  id: string;
  name: string;
  isDisabled?: boolean;
  value: Commission | undefined;
  onChange: (newValue: OnChangeValue<Commission, false>, actionMeta: ActionMeta<Commission>) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
}
