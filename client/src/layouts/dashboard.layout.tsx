import React, { FC, PropsWithChildren } from "react";
import { createStyles, Navbar, Group, rem, getStylesRef, Flex } from "@mantine/core";
import { IconLogout, IconUsers } from "@tabler/icons-react";
import Image from "next/image";
import AuthClient from "@/services/auth-client";
import { useRouter } from "next/router";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  navbar: {
    height: "100vh",
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [{ link: "/users", label: "Users", icon: IconUsers }];

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { classes, cx } = useStyles();

  const router = useRouter();

  const links = data.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: item.link === router.pathname })}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Flex>
      <Navbar className={classes.navbar} width={{ sm: 300 }} p="md">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <Image src="https://placehold.co/600x200" width={600} height={400} alt="Logo" />
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              AuthClient.logout(router);
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
      {children}
    </Flex>
  );
};

export default DashboardLayout;
