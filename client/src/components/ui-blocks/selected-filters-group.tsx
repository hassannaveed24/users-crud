import { XMarkIcon } from "@heroicons/react/20/solid";
import { Group } from "@mantine/core";
import React, { FC, Dispatch } from "react";
import { AppliedFilter } from "./selects/filter-select/types";

const AppliedFiltersGroup: FC<{ data: AppliedFilter[]; onDelete: Dispatch<AppliedFilter> }> = ({ data, onDelete }) => {
  return (
    <>
      {data.length > 0 && (
        <Group>
          {data.map((e) => (
            <div
              key={e.property.field}
              role="cell"
              className="bg-backgroundColors-neutral-2 text-sm text-textColors-1 rounded flex items-center"
            >
              <div className="py-[9px] pl-[11px]">
                <span className="font-[500]">{e.property.label}</span>{" "}
                <span className="text-textColors-3">{e.data.matchType.label}</span>{" "}
                <span className="font-[500]">{e.data.search}</span>
              </div>
              <div
                className="text-grey-5 hover:text-red-600 px-[11px] py-[9px] cursor-pointer transition-colors"
                role="button"
                onClick={() => onDelete(e)}
              >
                <XMarkIcon width={20} height={20} />
              </div>
            </div>
          ))}
        </Group>
      )}
    </>
  );
};

export default AppliedFiltersGroup;
