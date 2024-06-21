import { LayoutDashboard, Info, Users, Landmark, CircleUserRoundIcon } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Trang chủ",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Quản lý chung cư",
    icon: Info,
    href: "/manage",
    color: "text-orange-500",
    isChildren: true,
    children: [
      {
        title: "Quản lý dân cư",
        icon: Users,
        color: "text-red-500",
        href: "/manage/residents",
      },
      {
        title: "Quản lý khoản thu",
        icon: Landmark,
        color: "text-red-500",
        href: "/manage/fee",
      },
      {
        title: "Quản lý tài khoản",
        icon: CircleUserRoundIcon,
        color: "text-red-500",
        href: "/manage/account",
      },
    ],
  },
];
