import { useState, useRef, useEffect, MutableRefObject, MouseEventHandler } from "react";

const useHover = (opts?: { onMouseOver?: MouseEventHandler; onMouseOut?: MouseEventHandler }) => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseOver: MouseEventHandler = (e) => {
      setValue(true);
      opts?.onMouseOver?.(e);
    };
    const handleMouseOut: MouseEventHandler = (e) => {
      setValue(false);
      opts?.onMouseOut?.(e);
    };

    const node = ref.current as any;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (node) {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  return [ref, value] as [MutableRefObject<null | HTMLElement>, boolean];
};

export default useHover;
