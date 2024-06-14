import { BookOpenCheck, LayoutDashboard, Info, Users, Landmark } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Trang chủ",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Quản lý hệ thống",
    icon: Info,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Quản lý thông tin",
        icon: Users,
        color: "text-red-500",
        href: "/example/residents",
      },
      {
        title: "Quản lý khoản thu",
        icon: Landmark,
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "Example-03",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
];
