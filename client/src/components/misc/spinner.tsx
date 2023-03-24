import cls from "classnames";

type Props = {
  className?: string;
};

const Spinner: React.FunctionComponent<Props> = ({ className = "" }) => {
  return (
    <div
      className={cls("animate-spin inline-block border-current border-t-transparent rounded-full", className)}
      role="status"
      aria-label="loading"
    >
      <h1 className="text-4xl font-bold sr-only">Loading...</h1>
    </div>
  );
};

export default Spinner;
