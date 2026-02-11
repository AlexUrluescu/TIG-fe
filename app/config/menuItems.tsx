import {
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export type UserRole = "admin" | "user";

export const SIDEBAR_ITEMS = [
  {
    key: "/dashboard",
    icon: <UserOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
    allowedRoles: ["admin", "user"],
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: <Link href="/settings">Settings</Link>,
    allowedRoles: ["admin", "user"],
  },
  {
    key: "/admin-panel",
    icon: <SafetyCertificateOutlined />,
    label: <Link href="/admin-panel">Admin Panel</Link>,
    allowedRoles: ["admin"],
  },
];
