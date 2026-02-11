"use client";
import { Button, ConfigProvider, Flex } from "antd";
import { useState, useMemo } from "react";
import { DataTable } from "./DataTable";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Client } from "@/types/client";

interface ClientsCardProps {
  clients: Client[];
  title: string;
  height?: string;
  showDrawer: (type: string, client: Client) => void;
}

const ClientsCard: React.FC<ClientsCardProps> = ({
  clients,
  title,
  height,
  showDrawer,
}) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const router = useRouter();

  const columns: ColumnsType<Client> = [
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Client) => {
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
    {
      title: "Organisation ID",
      dataIndex: "organisationId",
      key: "organisationId",
    },
    {
      title: "Organisation Name",
      dataIndex: "customerInfo",
      key: "customerInfo",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_text: string, client: Client) => {
        return (
          <Button
            style={{
              border: "none",
              background: "transparent",
              boxShadow: "none",
            }}
            onClick={() => showDrawer("client", client)}
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

  const sortedClients = useMemo(() => {
    const data = [...clients];
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
          <Button style={{ display: "flex", gap: 3 }}>
            <Image src={"/sort.svg"} height={10} width={10} alt="sort-icon" />{" "}
            <span style={{ fontSize: 12 }}>Sort</span>
          </Button>
          <Button style={{ display: "flex", gap: 3 }}>
            <Image
              src={"/filter.svg"}
              height={10}
              width={10}
              alt="filter-icon"
            />{" "}
            <span style={{ fontSize: 12 }}>Filter</span>
          </Button>
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
          <DataTable<Client>
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={sortedClients}
            onRowClick={(row) => {
              console.log("Clicked ID:", row.id);
            }}
            ariaLabel="Clients list"
            className="applications-table ant-table-content"
          />
        </ConfigProvider>
      </div>
      {clients.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "end" }}
          className="mt-4 pt-3 border-t border-[#e0e0e0]"
        >
          <button
            onClick={() => router.push("/clients")}
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

export default ClientsCard;
