"use client";
import { useState } from "react";
import NavBarDevices from "../components/NavBarDevices";
import { Button, Flex } from "antd";
import Image from "next/image";
import GatewaysView from "../../views/gateways";
import TabsComponent from "./_components/Tabs";
import { Gateway } from "../../types/gateway";
import StatusTimeline from "../components/StatusTimeline";
import { userRole } from "@/mocks/userRole";

export default function GatewaysPage() {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "online":
        return "bg-[#52c41a]";
      case "denied":
        return "bg-[#bfbfbf]";
      case "failed":
        return "bg-[#ff4d4f]";
      default:
        return "bg-black";
    }
  };

  const showDrawer = (_type: string, data: Gateway) => {
    setSelectedGateway(data);
  };

  const actionButtonClass =
    "text-xs text-[#007A78] border-none shadow-none flex items-center gap-2 px-2";

  const gateways = true;

  const data = [
    { status: "off", percent: 10 },
    { status: "online", percent: 50 },
    { status: "standby", percent: 30 },
    { status: "off", percent: 10 },
  ] as const;

  return (
    <Flex className="h-screen overflow-hidden">
      <Flex
        vertical
        gap={18}
        style={{
          width: gateways ? "70%" : "100%",
          padding: "26px 0px",
          height: "100%",
        }}
      >
        <NavBarDevices tabSelected={"Gateways"} />
        <GatewaysView gateways={gateways} showDrawer={showDrawer} />
      </Flex>

      {gateways ? (
        <Flex
          style={{
            width: "30%",
            background: "#F7F7F8",
            padding: 25,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {selectedGateway ? (
            <Flex style={{ width: "100%" }} vertical gap={20}>
              <Flex justify="start">
                <Flex justify="center" align="start" className="w-1/2" vertical>
                  <span className="text-[17px] font-bold text-[#333F49]">
                    {selectedGateway.name}
                  </span>
                  <span className="text-sm font-medium text-[#808181]">
                    Last updated: 10 min ago
                  </span>

                  <Flex align="center" gap={5}>
                    <span
                      className={`shrink-0 w-2.5 h-2.5 rounded-full ${getStatusClass(
                        selectedGateway.status,
                      )}`}
                    />
                    <span className="text-sm font-medium text-[#808181]">
                      {selectedGateway.status}
                    </span>
                  </Flex>
                  <StatusTimeline
                    segments={data}
                    startTime="09:00"
                    endTime="17:00"
                  />
                </Flex>
              </Flex>
              {userRole === "ADMIN" && (
                <Flex gap={10}>
                  <Button
                    style={{
                      fontSize: 12,
                      border: "none",
                      color: "#007A78",
                      width: "100%",
                      justifyContent: "start",
                      fontWeight: 500,
                    }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/reload-arrow.svg"}
                      width={15}
                      height={15}
                      alt="reload-arrow-icon"
                    />
                    Refresh Status
                  </Button>
                </Flex>
              )}

              <div
                style={{ background: "transparent" }}
                className="flex flex-col rounded-[9px] py-5"
              >
                <TabsComponent selectedGateway={selectedGateway} />
              </div>
            </Flex>
          ) : (
            <Flex
              style={{ width: "100%" }}
              vertical
              justify="center"
              align="center"
              gap={20}
            >
              <Image
                src={"/no-device-selected.svg"}
                width={150}
                height={150}
                alt="no-device-select-picture"
              />
              <span
                style={{ color: "black", fontSize: "18", fontWeight: "600" }}
              >
                Select a gateway to view details.
              </span>
            </Flex>
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}
