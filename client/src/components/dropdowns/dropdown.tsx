import { Menu, Portal, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button, { ButtonVariantType } from "../buttons/Button";
import cls from "classnames";
import useManagedPopper from "@/utils/useManagedPopper";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Props = {
  variant?: ButtonVariantType;
  className?: string;
  containerClassName?: string;
  children: React.ReactElement | string;
  menu: React.ReactNode;
  leadingIcon?: React.ReactNode | undefined;
};

const Dropdown: React.FunctionComponent<Props> = ({
  variant = "white",
  containerClassName = "",
  className = "",
  children,
  menu,
  leadingIcon,
}) => {
  const { attributes, styles, setReferenceElement, setPopperElement } = useManagedPopper();
  return (
    <Menu as="div" className={cls("relative", containerClassName)}>
      <div ref={setReferenceElement}>
        <Menu.Button className={className}>
          <Button
            as="span"
            variant={variant}
            className={className}
            leadingIcon={leadingIcon}
            trailingIcon={<ChevronDownIcon className="w-4 h-4" />}
          >
            {children}
          </Button>
        </Menu.Button>
      </div>
      <Portal>
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items as="ul" className="w-48 py-1 bg-white rounded border-grey-9">
              {menu}
            </Menu.Items>
          </Transition>
        </div>
      </Portal>
    </Menu>
  );
};

export default Dropdown;
