import React from "react";
import { GroupBase, MenuProps, components } from "react-select";

const SearchMenu = <Option, isMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: MenuProps<Option, isMulti, Group>
) => {
  const { children, ...menuProps } = props;
  return (
    <components.Menu {...menuProps}>
      <div>some element</div> {children}
    </components.Menu>
  );
};

export default SearchMenu;
