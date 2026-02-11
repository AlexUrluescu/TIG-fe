"use client";

import { Button, ConfigProvider, Flex } from "antd";
import { SortButton } from "./SortButton";
import { useState, useMemo } from "react";
import { DataTable } from "./DataTable";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { Client } from "@/types/client";

interface ClientsCardTabelProps {
  showDrawer: (type: "client", data: Client) => void;
}

const ClientsCardTabel: React.FC<ClientsCardTabelProps> = ({ showDrawer }) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Memoize the sorted data
  const sortedClients = useMemo(() => {
    const data = [...MOCK_CLIENTS];
    return sortOrder === "newest" ? data.reverse() : data;
  }, [sortOrder]);

  const columns: ColumnsType<Client> = [
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "OrganisationID",
      dataIndex: "organisationId",
      key: "organisationId",
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

  return (
    <div
      style={{ border: "1px solid #DDDDDD" }}
      className="bg-white rounded-xl w-full flex flex-col h-[338px] px-4 lg:px-6 py-6 my-5"
    >
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
        <div className="text-[#333F49] text-xl font-semibold leading-normal tracking-[-0.2px]">
          Clients
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
                headerSplitColor: "transparent", // Removes dividers
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
    </div>
  );
};

export default ClientsCardTabel;
