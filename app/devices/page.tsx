"use client";
import { useState } from "react";
import NavBarDevices from "../components/NavBarDevices";
import { Button, Flex } from "antd";
import Image from "next/image";

import DevicesView from "../../views/devices";
import { userRole } from "@/mocks/userRole";
import StatusTimeline from "../components/StatusTimeline";
import { Device } from "@/types/device";

const data = [
  { status: "off", percent: 10 },
  { status: "online", percent: 50 },
  { status: "standby", percent: 30 },
  { status: "off", percent: 10 },
] as const;

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

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

  const detailRowClass = "w-full border-b border-[#F2F2F3] p-2.5 flex";
  const detailLabelClass = "text-[11px] font-bold w-[30%] text-start";
  const detailValueClass = "text-[11px] font-medium w-[70%] text-start";
  const actionButtonClass =
    "text-xs text-[#007A78] border-none shadow-none flex items-center gap-2 px-2";

  const devices = true;

  return (
    <Flex className="h-screen overflow-hidden">
      <Flex
        vertical
        gap={20}
        style={{
          width: devices ? "70%" : "100%",
          height: "100%",
          padding: "26px 0px",
        }}
      >
        <NavBarDevices tabSelected={"Devices"} />
        <DevicesView devices={devices} setSelectedDevice={setSelectedDevice} />
      </Flex>
      {devices ? (
        <Flex
          style={{
            width: "30%",
            background: "#F7F7F8",
            padding: 25,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {selectedDevice ? (
            <Flex className="w-100" vertical gap={20}>
              <Flex justify="space-between">
                <Flex align="center" className="w-1/2">
                  <Image
                    src={"/device.svg"}
                    width={170}
                    height={150}
                    alt="device-picture"
                  />
                </Flex>
                <Flex justify="center" align="start" className="w-1/2" vertical>
                  <span className="text-[17px] font-bold text-[#333F49]">
                    {selectedDevice.name}
                  </span>
                  <Flex align="center" gap={5}>
                    <span
                      className={`shrink-0 w-2.5 h-2.5 rounded-full ${getStatusClass(
                        selectedDevice.status,
                      )}`}
                    />
                    <span className="text-sm font-medium text-[#808181]">
                      {selectedDevice.status}
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
                <Flex gap={5}>
                  <Button
                    style={{ fontSize: 12, border: "none", color: "#007A78" }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/reload-arrow.svg"}
                      width={15}
                      height={15}
                      alt="reload-arrow-icon"
                    />
                    Restart Gateway
                  </Button>
                  <Button
                    style={{ fontSize: 12, border: "none", color: "#007A78" }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/download-icon.svg"}
                      width={15}
                      height={15}
                      alt="reload-arrow-icon"
                    />
                    Download Config
                  </Button>
                  <Button
                    style={{ fontSize: 12, border: "none", color: "#007A78" }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/upload-icon.svg"}
                      width={15}
                      height={15}
                      alt="reload-arrow-icon"
                    />
                    Upload Config
                  </Button>
                </Flex>
              )}

              <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>ID</span>
                  <span className={detailValueClass}>{selectedDevice.id}</span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Name</span>
                  <span className={detailValueClass}>
                    {selectedDevice.name}
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>LE ID</span>
                  <span className={detailValueClass}>
                    6d0938d-2be3-4353-bd52-76d66e2f20f9
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Le Name</span>
                  <span className={detailValueClass}>
                    razvan.miron+le001@mtdtechnology.com
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>vHSKUnits</span>
                  <span className={detailValueClass}>1</span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>IP Address</span>
                  <span className={detailValueClass}>
                    {selectedDevice.ipAddress}
                  </span>
                </div>

                <div className="w-full p-2.5 flex">
                  <span className={detailLabelClass}>Network Mask</span>
                  <span className={detailValueClass}>55.255.255.0</span>
                </div>
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
                Select a device to view details.{" "}
              </span>
            </Flex>
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}
