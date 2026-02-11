"use client";

import React, { useMemo, useState } from "react";
import { Button, Flex, Input, Pagination, Select, ConfigProvider } from "antd";
import { MOCK_NOTIFICATIONS } from "@/mocks/notifications";
import { NotificationItemRow } from "@/app/components/NotificationItemRow";
import Image from "next/image";

export function NotificationCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");

  const notifications = MOCK_NOTIFICATIONS;

  const handleMarkAsRead = async (id: string) => {
    console.log("mark read", id);
  };

  const handleReview = async (id: string) => {
    console.log("review", id);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const filteredNotifications = useMemo(() => {
    if (!searchText) return notifications;

    const lowerText = searchText.toLowerCase();

    return notifications.filter((n) => {
      const titleMatch = n.title?.toLowerCase().includes(lowerText);

      return titleMatch;
    });
  }, [notifications, searchText]);

  const displayNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredNotifications.slice(startIndex, endIndex);
  }, [filteredNotifications, currentPage, pageSize]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div
      style={{ gap: 10, border: "1px solid #DDDDDD" }}
      className="bg-white rounded-xl w-full flex flex-col min-h-[400px] h-auto px-4 lg:px-6 py-6"
    >
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
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
          <Button>Mark all as read</Button>
        </Flex>
      </Flex>

      <div style={{ padding: "0px 10px" }} className="flex flex-col w-full">
        {displayNotifications.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-sm text-[#808181]">No notifications</div>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <div key={notification.id} className="py-2">
              <NotificationItemRow
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onReview={handleReview}
                compact={true}
              />
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
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
                total={notifications.length}
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
}
