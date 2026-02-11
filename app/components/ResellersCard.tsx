"use client";

import { ConfigProvider, Flex } from "antd";
import { SortButton } from "./SortButton";
import { useState, useMemo } from "react";
import { DataTable } from "./DataTable";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";

export const MOCK_GATEWAYS: Reseller[] = [
  {
    id: "gw-7721",
    name: "Primary Edge Node",
    clients: 30,
  },
  {
    id: "gw-0042",
    name: "Backup Secondary",
    clients: 11,
  },
  {
    id: "gw-9910",
    name: "Global Load Balancer",
    clients: 19,
  },
  {
    id: "gw-3329",
    name: "Regional Proxy - East",
    clients: 8,
  },
  {
    id: "gw-1150",
    name: "Dev Sandbox GW",
    clients: 25,
  },
];

export type Reseller = {
  id: string;
  name: string;
  clients: number;
};

const columns: ColumnsType<Reseller> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  { title: "Allocated Clients", dataIndex: "clients", key: "clients" },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (_text: string) => {
      return (
        <Image
          src={"/info-gateway.svg"}
          width={15}
          height={15}
          alt="icon info gateway"
        />
      );
    },
  },
];

const ResellersCardTabel = () => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Memoize the sorted data
  const sortedGateways = useMemo(() => {
    const data = [...MOCK_GATEWAYS];
    return sortOrder === "newest" ? data.reverse() : data;
  }, [sortOrder]);

  return (
    <div
      style={{ border: "1px solid #DDDDDD" }}
      className="bg-white rounded-xl w-full flex flex-col h-[338px] px-4 lg:px-6 py-6 my-5"
    >
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
        <div className="text-[#333F49] text-xl font-semibold leading-normal tracking-[-0.2px]">
          Organisations
        </div>
        <SortButton
          sortOrder={sortOrder}
          onToggle={() =>
            setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
          }
        />
      </Flex>
      <div
        style={{ marginTop: 5 }}
        className="mb-6 rounded-xl pb-6 flex-row relative overflow-auto overflow-x-visible flex-1 min-h-0"
      >
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
          <DataTable<Reseller>
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

export default ResellersCardTabel;
