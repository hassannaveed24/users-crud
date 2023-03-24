import { components, OptionProps } from "react-select";
import Typography from "../../typography";
import { CommissionIcons } from "./constants";
import { commissions } from "@/data/commission/commission-types.data";

const CommissionSelectOption = (props: OptionProps<typeof commissions[number], false>) => {
  const { data } = props;

  const CommissionIcon = CommissionIcons[data.commissionUnit || "$"];

  return (
    <components.Option {...props} className="!p-0">
      <div className="p-4 flex gap-4 items-center">
        <CommissionIcon className="shrink-0 w-[24px] h-[24px] text-green-500" />
        <div>
          <Typography.Title className="!text-sm">{data.commissionName}</Typography.Title>
          <Typography.Body>{data.comTypeDescription}</Typography.Body>
        </div>
      </div>
    </components.Option>
  );
};

export default CommissionSelectOption;
