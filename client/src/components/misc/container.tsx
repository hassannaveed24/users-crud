import cls from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FunctionComponent<Props> = ({ children, className = "" }) => {
  return <div className={cls("mx-auto max-w-7xl px-4 sm:px-6 md:px-8", className)}>{children}</div>;
};

export default Container;
