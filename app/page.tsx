"use client";
import { Button, Drawer, Flex } from "antd";
import { NotificationsMetricCard } from "./components/NotificationsAlertsCard";
import { WelcomeHeader } from "./components/WelcomeBack";
import ResellersCardTabel from "./components/ResellersCard";
import ClientsCardTabel from "./components/ClientsCard";
import DevicesCardTabel, { Device } from "./components/DownDevicesCard";
import GatwewaysCard from "./components/GatewayCard";
import { MOCK_GATEWAYS } from "@/mocks/gateways";
import { useState } from "react";
import Image from "next/image";
import { Gateway } from "../types/gateway";
import StatusTimeline from "./components/StatusTimeline";
import TabsComponent from "./gateways/_components/Tabs";
import { Client } from "@/types/client";

const data = [
  { status: "off", percent: 10 },
  { status: "online", percent: 50 },
  { status: "standby", percent: 30 },
  { status: "off", percent: 10 },
] as const;

export default function HomePage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [drawType, setDrawType] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const showDrawer = (type: string, data: any) => {
    if (type === "device") {
      setSelectedDevice(data);
    } else if (type === "gateway") {
      setSelectedGateway(data);
    } else if (type === "client") {
      setSelectedClient(data);
    }

    setOpen(true);
    setDrawType(type);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedDevice(null);
    setDrawType(null);
  };

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

  const formatStatus = (status: string) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const detailRowClass = "w-full border-b border-[#F2F2F3] p-2.5 flex";
  const detailLabelClass = "text-[11px] font-bold w-[30%]";
  const detailValueClass = "text-[11px] font-medium w-[70%]";
  const actionButtonClass =
    "text-xs text-[#007A78] border-none shadow-none flex items-center gap-2 px-2";

  return (
    <div style={{ padding: 25 }} className="min-h-[calc(100vh-64px)]">
      <WelcomeHeader username={"Alexandre"} />
      <Flex vertical gap={20}>
        <DevicesCardTabel showDrawer={showDrawer} />
        <Flex gap={10}>
          <NotificationsMetricCard />
          <GatwewaysCard
            gateways={MOCK_GATEWAYS}
            title="Gateways"
            showDrawer={showDrawer}
          />
        </Flex>
        <Flex gap={10}>
          <ResellersCardTabel />
          <ClientsCardTabel showDrawer={showDrawer} />
        </Flex>
      </Flex>
      <Drawer
        title="Device Details"
        placement="right"
        onClose={onClose}
        open={open}
        size={450}
        mask={false}
        className="bg-[#F7F7F8]"
        styles={{
          body: {
            padding: 24,
            backgroundColor: "#F7F7F8",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        }}
      >
        {drawType === "device" && selectedDevice && (
          <Flex vertical gap={20} className="h-full overflow-hidden">
            <Flex justify="space-between" className="shrink-0">
              <Flex align="center" className="w-1/2">
                <Image
                  src={"/device.svg"}
                  width={170}
                  height={150}
                  alt="device-picture"
                />
              </Flex>
              <Flex justify="center" className="w-1/2" vertical>
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
                <div>timespan</div>
              </Flex>
            </Flex>

            <Flex gap={10} className="shrink-0">
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

            <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5 overflow-y-auto">
              <div className={detailRowClass}>
                <span className={detailLabelClass}>ID</span>
                <span className={detailValueClass}>{selectedDevice.id}</span>
              </div>
              <div className={detailRowClass}>
                <span className={detailLabelClass}>Name</span>
                <span className={detailValueClass}>{selectedDevice.name}</span>
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
        )}

        {drawType === "gateway" && selectedGateway && (
          <Flex vertical gap={20} className="h-full overflow-hidden">
            <Flex justify="start" className="shrink-0">
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

            <div
              style={{ background: "transparent" }}
              className="flex flex-col rounded-[9px] py-5"
            >
              <TabsComponent selectedGateway={selectedGateway} />
            </div>
          </Flex>
        )}

        {drawType === "client" && selectedClient && (
          <Flex vertical gap={20} className="h-full overflow-hidden">
            <Flex justify="start" className="shrink-0" gap={20}>
              <Flex style={{ width: "15%" }}>
                <Image
                  src={"/user-profile.svg"}
                  width={50}
                  height={50}
                  alt="user-profile"
                />
              </Flex>
              <Flex
                style={{ width: "85%" }}
                justify="center"
                align="start"
                className="w-1/2"
                vertical
              >
                <span className="text-[17px] font-bold text-[#333F49]">
                  {selectedClient.name}
                </span>
                <span className="text-sm font-medium text-[#808181]">
                  {selectedClient.customerInfo}
                </span>

                <Flex align="center" gap={5}>
                  <span
                    className={`shrink-0 w-2.5 h-2.5 rounded-full ${getStatusClass(
                      selectedClient.status,
                    )}`}
                  />
                  <span className="text-sm font-medium text-[#808181]">
                    {selectedClient.status}
                  </span>
                </Flex>
              </Flex>
            </Flex>

            <Flex gap={10}>
              <Button
                style={{
                  fontSize: 12,
                  border: "none",
                  color: "#007A78",
                  justifyContent: "start",
                  fontWeight: 500,
                }}
                className={actionButtonClass}
              >
                <Image
                  src={"/edit.svg"}
                  width={15}
                  height={15}
                  alt="edit-icon"
                />
                Edit User
              </Button>
              <Button
                style={{
                  fontSize: 12,
                  border: "none",
                  color: "#007A78",
                  justifyContent: "start",
                  fontWeight: 500,
                }}
                className={actionButtonClass}
              >
                <Image
                  src={"/plus-circle.svg"}
                  width={15}
                  height={15}
                  alt="plus-circle-icon"
                />
                Create VHSK
              </Button>
              <Button
                style={{
                  fontSize: 12,
                  border: "none",
                  color: "#007A78",
                  justifyContent: "start",
                  fontWeight: 500,
                }}
                className={actionButtonClass}
              >
                <Image
                  src={"/trash.svg"}
                  width={15}
                  height={15}
                  alt="trash-icon"
                />
                Delete User
              </Button>
            </Flex>

            <div
              style={{ overflowY: "scroll" }}
              className="flex flex-col bg-white rounded-[9px] py-5 px-2.5"
            >
              <div className={detailRowClass}>
                <span className={detailLabelClass}>User ID</span>
                <span className={detailValueClass}>{selectedClient.id}</span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Organization ID</span>
                <span className={detailValueClass}>
                  {selectedClient.organisationId}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Customer Info</span>
                <span className={detailValueClass}>
                  {selectedClient.customerInfo}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Street</span>
                <span className={detailValueClass}>
                  {selectedClient.street}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>City</span>
                <span className={detailValueClass}>{selectedClient.city}</span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Zip Code</span>
                <span className={detailValueClass}>
                  {selectedClient.zipCode}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Country</span>
                <span className={detailValueClass}>
                  {selectedClient.country}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Owner First Name</span>
                <span className={detailValueClass}>
                  {selectedClient.ownerFirstName}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Owner Last Name</span>
                <span className={detailValueClass}>
                  {selectedClient.ownerLastName}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Phone number</span>
                <span className={detailValueClass}>
                  {selectedClient.phoneNumber}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Email</span>
                <span className={detailValueClass}>{selectedClient.email}</span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Customer ID</span>
                <span className={detailValueClass}>
                  {selectedClient.customerId || "-"}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Delivery Address</span>
                <span className={detailValueClass}>
                  {selectedClient.deliveryAddress || "-"}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Authorized Recipients</span>
                <span className={detailValueClass}>
                  {selectedClient.authorizedRecipients || "-"}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Status</span>
                <span className={detailValueClass}>
                  {formatStatus(selectedClient.status)}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>
                  Worldline Email Address
                </span>
                <span className={detailValueClass}>
                  {selectedClient.worldlineLeEmail || "-"}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Worldline Le ID</span>
                <span className={detailValueClass}>
                  {selectedClient.worldlineLeId || "-"}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Worldline Le User Id</span>
                <span className={detailValueClass}>
                  {selectedClient.worldlineLeUserId || "-"}
                </span>
              </div>

              <div className={detailRowClass}>
                <span className={detailLabelClass}>Created at</span>
                <span className={detailValueClass}>
                  {selectedClient.createdAt}
                </span>
              </div>

              <div className="w-full p-2 flex">
                <span className={detailLabelClass}>Updated at</span>
                <span className={detailValueClass}>
                  {selectedClient.updatedAt}
                </span>
              </div>
            </div>
          </Flex>
        )}
      </Drawer>
    </div>
  );
}
