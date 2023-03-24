import cls from "classnames";

const getTabClassNames = (isActive: boolean) =>
  cls("py-4 px-1 border-b-2 font-medium text-sm hover:border-primary transition", {
    "border-primary text-primary ": isActive,
    "border-transparent text-textColors-3": !isActive,
  });

const tabContainerClassNames = "hidden -mb-px space-x-10 border-b sm:flex border-borderColors-2";

const HorizontalNav = {
  tabContainerClassNames,
  getTabClassNames,
};

export default HorizontalNav;
