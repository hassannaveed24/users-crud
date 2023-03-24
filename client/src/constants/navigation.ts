import HomeIcon from "@/assets/icons/home.svg";
import DollarIcon from "@/assets/icons/dollar.svg";
import CalenderIcon from "@/assets/icons/calender.svg";
import FacebookIcon from "@/assets/icons/fb-square.svg";
import UsersIcon from "@/assets/icons/users.svg";
import TrophyIcon from "@/assets/icons/trophy.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import GraphIcon from "@/assets/icons/graph-square.svg";
import FileIcon from "@/assets/icons/file.svg";

export const accountRoutePathname = "/dashboard/account";

const navigation = [
  [
    { name: "Business Overview", href: "/business-overview", icon: HomeIcon },
    { name: "Closer Dashboard", href: "/dashboard/closer", icon: DollarIcon },
    { name: "Setter Dashboard", href: "/dashboard/setter", icon: CalenderIcon },
    { name: "Facebook Ads", href: "/facebook-ads", icon: FacebookIcon },
  ],
  [
    { name: "Contacts", href: "/dashboard/contacts", icon: UsersIcon },
    { name: "Deals", href: "/deals", icon: TrophyIcon },
    { name: "Calls", href: "/calls", icon: PhoneIcon },
    { name: "Payments", href: "/payments", icon: GraphIcon },
  ],
  [{ name: "Tasks", href: "/dashboard/tasks", icon: FileIcon }],
];

export const INITIAL_PAGE = `${accountRoutePathname}/general`;

export default navigation;
