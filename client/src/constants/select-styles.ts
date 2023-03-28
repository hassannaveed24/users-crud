import cls from "classnames";
import { GroupBase } from "react-select";
import { ClassNamesConfig, StylesConfig } from "react-select/dist/declarations/src/styles";

export const getDefaultSelectClassNames = <
  O = unknown,
  M extends boolean = false,
  G extends GroupBase<O> = GroupBase<O>
>(
  classNames?: ClassNamesConfig<O, M, G>
) => {
  const selectClassNames: ClassNamesConfig<O, M, G> = {
    menuList: (props) => cls("", classNames?.menuList?.(props)),
    dropdownIndicator: (props) => cls("p-0", classNames?.dropdownIndicator?.(props)),
    indicatorsContainer: (props) => cls("pr-2", classNames?.indicatorsContainer?.(props)),
    singleValue: (props) => cls("text-sm font-medium !text-textColors-1", classNames?.singleValue?.(props)),
    option: (props) => {
      return cls(
        "!cursor-pointer !text-textColors-3 !text-sm transition-colors",
        {
          "bg-backgroundColors-neutral-2": props.isSelected || props.isFocused,
        },
        classNames?.option?.(props)
      );
    },
    noOptionsMessage: () => "!text-sm",
    menu: (props) => cls("!shadow-sm border border-borderColors-1", classNames?.menu?.(props)),
    container: (props) => {
      return cls("", classNames?.container?.(props));
    },
    control: (props) => {
      return cls(
        "!shadow-sm !rounded cursor-pointer hover:bg-backgroundColors-neutral-2 border-borderColors-1 transition-colors",
        { "!opacity-25 !cursor-not-allowed": props.isDisabled },
        classNames?.control?.(props)
      );
    },
    input: () => "!text-sm !text-textColors-3",
    placeholder: (props) =>
      cls(
        "!text-sm",
        { "!text-textColors-3": props.selectProps.controlShouldRenderValue },
        { "!text-textColors-1 !font-medium": !props.selectProps.controlShouldRenderValue },
        classNames?.placeholder?.(props)
      ),
    indicatorSeparator: (props) => cls("!w-0", classNames?.indicatorSeparator?.(props)),
    valueContainer: (props) =>
      cls(
        {
          [cls("!max-w-[90%] !text-ellipsis !whitespace-nowrap !overflow-hidden", {
            "display-initial": props.hasValue,
          })]:
            props.isMulti &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            props.selectProps.includeMultiClasses !== false,
        },
        classNames?.valueContainer?.(props)
      ),
    menuPortal: () => "z-dropdowns",
    multiValue: (props) => cls("!inline-flex", classNames?.multiValue?.(props)),
  };
  return selectClassNames as any;
};

export const getDefaultSelectStyles = <
  O = unknown,
  M extends boolean = false,
  G extends GroupBase<O> = GroupBase<O>
>() => {
  const styles: StylesConfig<O, M, G> = {
    option: (styles) => {
      delete (styles["&:active"] as any)?.backgroundColor;
      delete styles.backgroundColor;
      delete styles.color;
      return styles;
    },
    dropdownIndicator: (styles) => {
      delete styles.padding;
      return styles;
    },
    control: (styles) => {
      delete (styles["&:hover"] as any).borderColor;
      delete styles.borderColor;
      delete styles.cursor;
      delete styles.boxShadow;
      return styles;
    },
  };

  return styles as any;
};
