"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flex, Button, Badge } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { HomeIcon } from "./icons/HomeIcon";
import { DiagramsIcon } from "./icons/DiagramsIcon";
import { BellIcon } from "./icons/BellIcon";
import Image from "next/image";

const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DEVICES: "/devices",
  ORGANISATIONS: "/organisations",
  GATEWAYS: "/gateways",
  CLIENTS: "/clients",
  APPLICATIONS_NEW: "/applications/new",
  APPLICATIONS_DETAIL: (appId: string) => `/applications/${appId}`,
  APPLICATIONS_ONBOARDING_PENDING: "/applications/onboarding/pending",

  NOTIFICATIONS: "/notifications",
  AUDIT: "/audit",
} as const;

const items = [
  {
    key: "Home",
    path: ROUTES.HOME,
  },
  {
    key: "Devices",
    path: ROUTES.DEVICES,
  },
  {
    key: "Notifications",
    path: ROUTES.NOTIFICATIONS,
  },
  {
    key: "Audit",
    path: ROUTES.AUDIT,
  },
];

interface NavBarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const NavBar = ({ isExpanded = false, onToggle }: NavBarProps) => {
  const pathname = usePathname();
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const renderIcon = (key: string, color: string, className: string) => {
    switch (key) {
      case "Home":
        return <HomeIcon fill={color} className={className} />;

      case "Devices":
      case "Organisations":
      case "Gateways":
      case "Clients":
        return <DiagramsIcon fill={color} className={className} />;

      case "Audit":
        return (
          <Image
            src={"/audit-logo.svg"}
            height={20}
            width={20}
            alt="audit-logo"
          />
        );
      default:
        return <BellIcon fill={color} className={className} />;
    }
  };

  function isRoute(pathname: string, route: string): boolean {
    if (route === ROUTES.DEVICES) {
      return (
        pathname === ROUTES.DEVICES || pathname.startsWith(`${ROUTES.DEVICES}/`)
      );
    }
    return pathname === route;
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = (itemKey: string) => {
    setClickedItem(itemKey);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setClickedItem(null), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Flex
      justify="space-between"
      vertical
      className={`items-center navbar-container ${isExpanded ? "navbar-container-expanded" : "navbar-container-collapsed"}`}
      style={{ height: "100%", padding: "20px 0px" }}
    >
      <Flex
        gap={25}
        style={{
          borderBottom: "1px solid gainsboro",
          padding: "10px 0px",
        }}
        vertical
      >
        <Flex
          className={`w-full h-[40px] items-center ${isExpanded ? "justify-center pl-[3px]" : "justify-center"}`}
        >
          <Image
            style={{ marginTop: 40 }}
            src={"/logo.svg"}
            alt="logo"
            height={10}
            width={20}
          />
        </Flex>
        {onToggle && (
          <Flex
            style={{ marginTop: 30, color: "white" }}
            className={`w-full h-[40px] bg-[#007A78] items-center ${isExpanded ? "justify-center pl-[3px]" : "justify-center"}`}
          >
            <Button
              type="text"
              icon={
                isExpanded ? (
                  <MenuFoldOutlined style={{ color: "white" }} />
                ) : (
                  <MenuUnfoldOutlined style={{ color: "white" }} />
                )
              }
              onClick={onToggle}
              onKeyDown={(e) => handleKeyDown(e, onToggle)}
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
              aria-expanded={isExpanded}
              className="navbar-toggle-button"
              tabIndex={0}
            />
          </Flex>
        )}
        <Flex vertical>
          {items.map((item) => {
            const isActive = isRoute(pathname, item.path);
            const iconColor = isActive ? "#007A78" : "#333F49";
            const iconClassName = `max-w-full w-[25px] h-auto transition-colors duration-200`;

            return (
              <Link
                key={item.key}
                href={item.path}
                onClick={() => handleClick(item.key)}
                className={
                  isExpanded ? "nav-link-expanded" : "nav-link-collapsed"
                }
                style={{ textDecoration: "none", padding: "5px 10px" }}
              >
                <Flex
                  align="center"
                  justify={isExpanded ? "start" : "center"}
                  className="nav-item"
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: isActive ? "#007A7817" : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      minWidth: "25px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {renderIcon(item.key, iconColor, iconClassName)}
                  </div>
                  <span
                    className={`nav-item-label ${isActive ? "nav-item-label-active" : ""}`}
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      width: isExpanded ? "auto" : 0,
                      marginLeft: isExpanded ? 10 : 0,
                      transition:
                        "opacity 0.2s ease-in-out, width 0.2s ease-in-out, margin 0.2s ease-in-out",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      display: "inline-block",
                      color: isActive ? "#007A78" : "inherit", // Added color sync for the text
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.key}
                  </span>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        justify="center"
        style={{ background: "#333F49", padding: "15px 0px", width: "100%" }}
      >
        <Image
          style={{ marginRight: 5 }}
          src={"/logout.svg"}
          height={20}
          width={20}
          alt="logout icon"
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
