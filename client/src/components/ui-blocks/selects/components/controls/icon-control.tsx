import React, { FC } from "react";
import { components } from "react-select";
import { ControlProps } from "react-select";
import cls from "classnames";

// eslint-disable-next-line @typescript-eslint/ban-types
type IconOptions = { icon: SVGComponent; size: number; className?: string };
type Icon = IconOptions | SVGComponent | undefined;

type IconType = "leadingIcon" | "trailingIcon";

interface IconProps {
  icon: Icon;
  type: IconType;
}

const getClassNames = (type: IconType, options?: { className?: string }) => {
  const { className = "" } = options || {};
  return cls(
    "text-textColors-1",
    {
      "ml-4 mr-1": type === "leadingIcon",
      "ml-1 mr-4": type === "trailingIcon",
    },
    className
  );
};

const Icon: FC<IconProps> = (props) => {
  const { type, icon: Icon } = props;
  if (!Icon) return null;

  if (typeof Icon === "object") {
    const { icon: SVGIcon, size, className = "" } = Icon;
    return <SVGIcon width={size} height={size} className={getClassNames(type, { className })} />;
  }

  return <Icon width="14" height="14" className={getClassNames(type)} />;
};

const IconControl = <Option, isMulti extends boolean = false>(props: ControlProps<Option, isMulti>) => {
  const { children, ...optionProps } = props;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const leadingIcon = optionProps.selectProps.leadingIcon as Icon;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const trailingIcon = optionProps.selectProps.trailingIcon as Icon;

  return (
    <components.Control {...optionProps}>
      <Icon type="leadingIcon" icon={leadingIcon} />
      {children}
      <Icon type="trailingIcon" icon={trailingIcon} />
    </components.Control>
  );
};

export default IconControl;
