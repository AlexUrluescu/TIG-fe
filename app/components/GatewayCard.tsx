"use client";
import { Button, ConfigProvider, Drawer, Flex } from "antd";
import { useState, useMemo } from "react";
import { DataTable } from "./DataTable";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { Gateway } from "../../types/gateway";
import { useRouter } from "next/navigation";

interface GatewaysCardProps {
  gateways: Gateway[];
  title: string;
  height?: string;
  showDrawer: (type: string, device: Gateway) => void;
}

const GatwewaysCard: React.FC<GatewaysCardProps> = ({
  gateways,
  title,
  height,
  showDrawer,
}) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const router = useRouter();

  const columns: ColumnsType<Gateway> = [
    {
      title: "Vhsk Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Gateway) => {
        const statusColors: Record<string, string> = {
          online: "#34C759",
          failed: "#EA2227",
          denied: "#808181",
        };

        const dotColor = statusColors[record.status.toLowerCase()] || "#261b1b";

        return (
          <Flex align="center" gap={10}>
            <div
              style={{ background: dotColor }}
              className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
            />
            <span className="font-medium text-[#333F49]">{text}</span>
          </Flex>
        );
      },
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "IP Address", dataIndex: "ipAddress", key: "ipAddress" },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_text: string, gateway: Gateway) => {
        return (
          <Button
            style={{
              border: "none",
              background: "transparent",
              boxShadow: "none",
            }}
            onClick={() => showDrawer("gateway", gateway)}
          >
            <Image
              src="/info-gateway.svg"
              width={18}
              height={18}
              alt="info icon"
              className="cursor-pointer hover:opacity-70 transition-opacity"
            />
          </Button>
        );
      },
    },
  ];

  const sortedGateways = useMemo(() => {
    const data = [...gateways];
    return sortOrder === "newest" ? data.reverse() : data;
  }, [sortOrder]);

  return (
    <div
      style={{ gap: 10, maxHeight: height ? height : "338px" }}
      className="bg-white rounded-xl w-full flex flex-col px-4 lg:px-6 py-6 border border-[#DDDDDD]"
    >
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
        <div className="text-[#333F49] text-xl font-semibold leading-normal tracking-[-0.2px]">
          {title}
        </div>

        <Flex gap={5}>
          <Button>Sort</Button>
          <Button>Filter</Button>
        </Flex>
      </Flex>
      <div className="rounded-xl pb-6 flex-row relative overflow-auto overflow-x-visible flex-1 min-h-0">
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
          <DataTable<Gateway>
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
      {gateways.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "end" }}
          className="mt-4 pt-3 border-t border-[#e0e0e0]"
        >
          <button
            onClick={() => router.push("/gateways")}
            className="text-sm text-[#000000] hover:text-[#0539a8] flex items-center gap-1 cursor-pointer"
          >
            View all
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GatwewaysCard;
