import React, { FC, DispatchWithoutAction, PropsWithChildren } from "react";
import { Form } from "formik";
import {
  Modal as MantineModal,
  Title,
  useMantineTheme,
  LoadingOverlay,
  ScrollArea,
  Group,
  Button,
} from "@mantine/core";

type FooterPosition = "right" | "center" | "left" | "apart";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ModalProps {
  opened: boolean;
  onClose: DispatchWithoutAction;
  title: string | React.ReactNode;
  loading?: boolean;
  footer?: React.ReactNode | undefined;
  footerPosition?: FooterPosition;
  withFormik?: boolean;
  maxHeight?: number;
  size?: Size;
}

const Body: FC<PropsWithChildren<{ maxHeight: number }>> = ({ children, maxHeight }) => {
  return (
    <ScrollArea.Autosize mah={maxHeight} offsetScrollbars>
      {children}
    </ScrollArea.Autosize>
  );
};

interface FooterProps {
  customFooter?: React.ReactNode | undefined;
  footerPosition: FooterPosition;
  onClose: DispatchWithoutAction;
}

const Footer: FC<FooterProps> = ({ footerPosition, onClose, customFooter }) => {
  return (
    <Group
      position={footerPosition}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        margin: "auto -12px -12px -24px",
        padding: "20px 24px",
        borderBottomLeftRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
      })}
    >
      {customFooter || (
        <>
          <Button type="button" variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </>
      )}
    </Group>
  );
};

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    opened,
    onClose,
    title,
    loading = false,
    children: body,
    footer,
    footerPosition = "right",
    withFormik = false,
    maxHeight = 400,
    size = "sm",
  } = props;

  const theme = useMantineTheme();

  return (
    <MantineModal
      zIndex={1000}
      size={size}
      opened={opened}
      onClose={() => {
        if (loading) return;
        onClose();
      }}
      title={typeof title === "string" ? <Title weight={600}>{title}</Title> : title}
      // closeButtonProps={}
      // closeButtonLabel="Close edit user popup"
      shadow="xs"
      overlayProps={{ blur: 3, opacity: 0.5, color: theme.colors[theme.primaryColor][4] }}
      styles={{
        content: {
          display: "flex",
          flexDirection: "column",
          minWidth: 550,
          minHeight: 340,
          padding: "24px 12px 12px 24px !important",
        },

        header: {
          paddingRight: 12,
          marginBottom: 24,
        },
        body: {
          flex: 1,
        },
        close: {
          color: theme.colors[theme.primaryColor][0],
        },
      }}
    >
      <LoadingOverlay visible={loading} overlayBlur={3} />
      {withFormik ? (
        <Form className="min-h-[260px] flex flex-col">
          <button type="submit" className="hidden" />
          <Body maxHeight={maxHeight}>{body}</Body>
          <Footer footerPosition={footerPosition} onClose={onClose} customFooter={footer} />
        </Form>
      ) : (
        <>
          <Body maxHeight={maxHeight}>{body}</Body>
          <Footer footerPosition={footerPosition} onClose={onClose} customFooter={footer} />
        </>
      )}
    </MantineModal>
  );
};

export default Modal;
