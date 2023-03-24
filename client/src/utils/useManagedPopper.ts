import { Placement } from "@popperjs/core";
import { CSSProperties, useState } from "react";
import { usePopper } from "react-popper";

type PopperStylesType = { [key: "popper" | string]: CSSProperties };

type PopperAttributesType = { [key: "popper" | string]: object };

type TPopper = {
  setReferenceElement: any;
  setPopperElement: any;
  styles: PopperStylesType;
  attributes: PopperAttributesType;
};

type ManagerPopperOptions = {
  placement?: Placement;
};

const useManagedPopper = (props?: ManagerPopperOptions): TPopper => {
  const { placement = "bottom-start" } = props || {};
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement }) as {
    styles: PopperStylesType;
    attributes: PopperAttributesType;
  };

  return { setReferenceElement, setPopperElement, styles, attributes };
};

export default useManagedPopper;
