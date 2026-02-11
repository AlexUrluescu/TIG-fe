"use client";

import React, { useState } from "react";
import { Layout, theme } from "antd";
import { UserRole } from "../config/menuItems";
import NavBar from "./Navbar";

const { Sider, Content } = Layout;

interface AppSideLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
}

export default function AppSideLayout({
  children,
  userRole,
}: AppSideLayoutProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sidebarWidth = isExpanded ? 200 : 60;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        id="app-sider"
        width={sidebarWidth}
        className="shadow-[6px_7px_15.1px_0_rgba(0,0,0,0.07)]"
        style={{
          background: "transparent",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          transition: "all 0.2s ease-in-out",
          overflow: "hidden",
          zIndex: 100,
        }}
      >
        <NavBar
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: sidebarWidth,
          transition: "margin-left 0.2s ease-in-out",
        }}
      >
        <Content style={{ margin: "0", overflow: "initial" }}>
          <div
            style={{
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
