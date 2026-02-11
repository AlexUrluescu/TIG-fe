"use client";
import React from "react";
import { Flex, Input, Button } from "antd";
import { useRouter } from "next/navigation";

interface NavBarDevicesProps {
  tabSelected: string;
}

const NavBarDevices: React.FC<NavBarDevicesProps> = ({ tabSelected }) => {
  const router = useRouter();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "40%" }}>
        <Input
          style={{ background: "#F7F7F8", borderRadius: 26, border: "none" }}
          placeholder="Search"
        />
      </div>

      <Flex gap={10} justify="end" style={{ width: "60%" }}>
        <Button
          onClick={() => router.push("/organisations")}
          style={{
            background: tabSelected === "Organisations" ? "#F2F2F3" : "white",
            border: "none",
            borderRadius: 4,
            fontSize: 12,
            boxShadow: "none",
            color: tabSelected === "Organisations" ? "#333F49" : "#808181",
          }}
        >
          Organisations
        </Button>
        <Button
          onClick={() => router.push("/gateways")}
          style={{
            background: tabSelected === "Gateways" ? "#F2F2F3" : "white",
            border: "none",
            borderRadius: 4,
            fontSize: 12,
            boxShadow: "none",
            color: tabSelected === "Gateways" ? "#333F49" : "#808181",
          }}
        >
          Gateways
        </Button>
        <Button
          onClick={() => router.push("/devices")}
          style={{
            background: tabSelected === "Devices" ? "#F2F2F3" : "white",
            border: "none",
            borderRadius: 4,
            fontSize: 12,
            boxShadow: "none",
            color: tabSelected === "Devices" ? "#333F49" : "#808181",
          }}
        >
          Devices
        </Button>
        <Button
          onClick={() => router.push("/clients")}
          style={{
            background: tabSelected === "Clients" ? "#F2F2F3" : "white",
            border: "none",
            borderRadius: 4,
            fontSize: 12,
            boxShadow: "none",
            color: tabSelected === "Clients" ? "#333F49" : "#808181",
          }}
        >
          Clients
        </Button>
      </Flex>
    </div>
  );
};

export default NavBarDevices;
