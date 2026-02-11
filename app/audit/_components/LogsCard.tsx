"use client";
import { Button, ConfigProvider, Flex, Input, Pagination, Select } from "antd";
import { useState, useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";

import { DataTable } from "@/app/components/DataTable";
import { LogEntry } from "@/types/logs";

interface LogsCardProps {
  logs: LogEntry[];
  title: string;
  height?: string;
  showDrawer: (type: string, device: LogEntry) => void;
}

const LogsCard: React.FC<LogsCardProps> = ({ logs, height, showDrawer }) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const columns: ColumnsType<LogEntry> = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    { title: "Resource Type", dataIndex: "resourceType", key: "resourceType" },
    { title: "ActorID", dataIndex: "actorId", key: "actorId" },
    { title: "Actor Role", dataIndex: "actorRole", key: "actorRole" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_text: string, log: LogEntry) => {
        return (
          <Button
            style={{
              border: "none",
              background: "transparent",
              boxShadow: "none",
            }}
            onClick={() => showDrawer("log", log)}
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

  const sortedLogs = useMemo(() => {
    const data = [...logs];
    return sortOrder === "newest" ? data.reverse() : data;
  }, [sortOrder]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const filteredLogs = useMemo(() => {
    if (!searchText) return sortedLogs;

    const lowerText = searchText.toLowerCase();

    return sortedLogs.filter((n) => {
      const titleMatch = n.action?.toLowerCase().includes(lowerText);

      return titleMatch;
    });
  }, [logs, searchText]);

  const displayLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredLogs.slice(startIndex, endIndex);
  }, [filteredLogs, currentPage, pageSize]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div
      style={{ gap: 10, maxHeight: height ? height : "338px" }}
      className="bg-white rounded-xl w-full flex flex-col px-4 lg:px-6 py-6 border border-[#DDDDDD]"
    >
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
        <Flex
          style={{ width: "100%" }}
          justify="space-between"
          align="center"
          gap={8}
          className="mb-4"
        >
          <div style={{ width: "40%" }}>
            <Input
              onChange={onSearchChange}
              style={{ borderRadius: 26, background: "#F7F7F8" }}
              placeholder="Search"
            />
          </div>

          <Flex justify="end" gap={5} style={{ width: "60%" }}>
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
          <DataTable<LogEntry>
            rowKey={(r) => r.id}
            columns={columns}
            dataSource={displayLogs}
            onRowClick={(row) => {
              console.log("Clicked ID:", row.id);
            }}
            ariaLabel="logs list"
            className="applications-table ant-table-content"
          />
        </ConfigProvider>
      </div>
      {logs.length > 0 && (
        <div className="mt-auto pt-4 border-t border-[#e0e0e0]">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#008080",
                borderRadius: 4,
              },
              components: {
                Pagination: {
                  itemActiveBg: "transparent",
                },
              },
            }}
          >
            <Flex justify="space-between" align="center" className="w-full">
              <Pagination
                simple={false}
                current={currentPage}
                total={logs.length}
                pageSize={pageSize}
                onChange={onPageChange}
                showSizeChanger={false}
                size="small"
              />

              <div className="flex items-center">
                <Select
                  value={pageSize}
                  onChange={onPageSizeChange}
                  variant="borderless"
                  className="min-w-[140px] text-right"
                  options={[
                    { value: 5, label: "View 5 / page" },
                    { value: 10, label: "View 10 / page" },
                    { value: 20, label: "View 20 / page" },
                  ]}
                />
              </div>
            </Flex>
          </ConfigProvider>
        </div>
      )}
    </div>
  );
};

export default LogsCard;
