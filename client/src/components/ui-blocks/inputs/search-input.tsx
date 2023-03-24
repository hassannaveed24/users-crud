import DumbInputInline from "@/components/inputs/dumb/dumb-input-inline";
import React, { Dispatch, FC } from "react";
import SearchIcon from "@/assets/icons/search.svg";

interface SearchInputProps {
  id: string;
  value: string;
  className?: string;
  placeholder: string;
  onChange: Dispatch<string>;
}

const SearchInput: FC<SearchInputProps> = ({ onChange, ...props }) => {
  return (
    <DumbInputInline
      inputProps={{
        ...props,
        name: props.id,
        onChange: (event) => onChange(event.target.value),
      }}
      leadingIcon={<SearchIcon width="20" height="20" />}
    />
  );
};

export default SearchInput;
