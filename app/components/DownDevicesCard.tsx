"use client";

import { Button, ConfigProvider, Drawer, Flex } from "antd";
import { SortButton } from "./SortButton";
import { useState, useMemo } from "react";
import { DataTable } from "./DataTable";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import StatusTimeline from "./StatusTimeline";

const data = [
  { status: "off", percent: 10 },
  { status: "online", percent: 50 },
  { status: "standby", percent: 30 },
  { status: "off", percent: 10 },
] as const;

export const MOCK_DEVICES: Device[] = [
  {
    id: "gw-7721",
    name: "Edge_Node_Alpha",
    type: "Gateway",
    status: "online",
    clientName: "TechCorp Industries",
    ipAddress: "192.168.1.105",
    runtime: "12d 4h 22m",
    lastUpdate: "2026-02-01 14:30",
  },
  {
    id: "gw-0042",
    name: "Backup_Sensor_01",
    type: "Sensor",
    status: "failed",
    clientName: "BioHealth Solutions",
    ipAddress: "10.0.0.12",
    runtime: "0d 0h 0m",
    lastUpdate: "2026-01-30 09:15",
  },
  {
    id: "gw-9910",
    name: "Main_Router_Global",
    type: "Network",
    status: "denied",
    clientName: "Global Logistics",
    ipAddress: "172.16.254.1",
    runtime: "45d 12h 0m",
    lastUpdate: "2026-02-02 11:00",
  },
  {
    id: "ba5e3c86-90f6-4c16-b397-c3c6cb9bc514",
    name: "vhsk_248",
    type: "Gateway",
    status: "online",
    clientName: "Security First Inc",
    ipAddress: "192.168.5.20",
    runtime: "3d 1h 10m",
    lastUpdate: "2026-02-02 08:45",
  },
];

export type Device = {
  id: string;
  name: string;
  type: string;
  status: string;
  clientName: string;
  ipAddress: string;
  runtime: string;
  lastUpdate: string;
};

interface DevicesCardTabelProps {
  showDrawer: (type: string, device: Device) => void;
}

const DevicesCardTabel: React.FC<DevicesCardTabelProps> = ({ showDrawer }) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [open, setOpen] = useState(false);

  const columns: ColumnsType<Device> = [
    {
      title: "Type",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Device) => {
        const statusClassMap: Record<string, string> = {
          online: "bg-[#52c41a]",
          failed: "bg-[#ff4d4f]",
          denied: "bg-[#bfbfbf]",
        };

        return (
          <Flex align="center" gap={10}>
            <span
              className={`shrink-0 w-2.5 h-2.5 rounded-full ${
                statusClassMap[record.status] || "bg-[#d9d9d9]"
              }`}
            />
            <Image
              src={"/device.svg"}
              height={50}
              width={50}
              alt="device-picture"
            />
          </Flex>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Status",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <span className="text-slate-500">{type}</span>,
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Runtime",
      dataIndex: "runtime",
      key: "runtime",
      render: () => (
        <StatusTimeline segments={data} startTime="09:00" endTime="17:00" />
      ),
    },
    {
      title: "Last update",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "right",
      render: (_text, device) => (
        <Button
          style={{
            border: "none",
            background: "transparent",
            boxShadow: "none",
          }}
          onClick={() => showDrawer("device", device)}
        >
          <Image
            src="/info-gateway.svg"
            width={18}
            height={18}
            alt="info icon"
            className="cursor-pointer hover:opacity-70 transition-opacity"
          />
        </Button>
      ),
    },
  ];

  const sortedGateways = useMemo(() => {
    const data = [...MOCK_DEVICES];
    return sortOrder === "newest" ? data.reverse() : data;
  }, [sortOrder]);

  return (
    <div className="bg-white rounded-xl w-full flex flex-col h-[338px] px-4 lg:px-6 py-6 my-5 border border-[#DDDDDD]">
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
        <div className="text-[#333F49] text-xl font-semibold leading-normal tracking-[-0.2px]">
          Devices
        </div>

        <SortButton
          sortOrder={sortOrder}
          onToggle={() =>
            setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
          }
        />
      </Flex>
      <div className="mt-[5px] mb-6 rounded-xl pb-6 flex-row relative overflow-auto overflow-x-visible flex-1 min-h-0">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#ffffff",
                headerSplitColor: "transparent",
              },
            },
          }}
        >
          <DataTable<Device>
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={sortedGateways}
            onRowClick={(row) => {
              console.log("Clicked ID:", row.id);
            }}
            ariaLabel="Gateways list"
            className="applications-table ant-table-content"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DevicesCardTabel;
