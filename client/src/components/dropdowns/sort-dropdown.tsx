import { Menu } from "@headlessui/react";
import React from "react";
import Dropdown from "./dropdown";
import cls from "classnames";
import Image from "next/image";
import { SortOrder } from "@/types/grid";

type SortDropdownProps = {
  currentOrder: SortOrder;
  onChange: (order: SortOrder) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ currentOrder, onChange = () => {} }) => {
  return (
    <Dropdown
      leadingIcon={
        <Image
          src={`/images/icons/sort-${currentOrder === "ASC" ? "ascending" : "descending"}.svg`}
          width={14}
          height={14}
          className="pointer-events-none"
          alt="Sort icon"
        />
      }
      menu={
        <>
          <Menu.Item
            as="li"
            onClick={() => {
              onChange(SortOrder.DESC);
            }}
          >
            {({ active }) => (
              <p
                className={cls("cursor-pointer block px-4 py-2 text-sm text-gray-700", {
                  "bg-gray-100": active || currentOrder === SortOrder.DESC,
                })}
              >
                Newest First
              </p>
            )}
          </Menu.Item>
          <Menu.Item
            as="li"
            onClick={() => {
              onChange(SortOrder.ASC);
            }}
          >
            {({ active }) => (
              <p
                className={cls("cursor-pointer block px-4 py-2 text-sm text-gray-700", {
                  "bg-gray-100": active || currentOrder === SortOrder.ASC,
                })}
              >
                Oldest First
              </p>
            )}
          </Menu.Item>
        </>
      }
    >
      Sort
    </Dropdown>
  );
};

export default SortDropdown;
