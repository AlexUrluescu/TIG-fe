"use client";

import { Flex } from "antd";
import { NotificationActions } from "./NotificationActions";
import { NotificationItem } from "@/types/notification";

interface NotificationItemRowProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
  onReview: (id: string) => void;
  showButtons?: boolean;
  compact?: boolean;
}

export function NotificationItemRow({
  notification,
  onMarkAsRead,
  onReview,
  showButtons = true,
  compact = false,
}: NotificationItemRowProps) {
  const isUnread = !notification.isRead;

  return (
    <Flex
      //   style={{ background: "pink" }}
      align="center"
      gap={8}
      justify="space-between"
    >
      <Flex
        // style={{ background: "red" }}s
        align="flex-start"
        gap={8}
        className="flex-1 min-w-0"
      >
        {isUnread && (
          <div className="w-2 h-2 rounded-full bg-[#007A78] flex-shrink-0 mt-2" />
        )}
        <Flex
          style={{
            // background: "blue",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
          vertical
          className="flex-1 min-w-0"
        >
          <div
            className={`${compact ? "text-sm" : "text-base"} font-semibold text-[#333F49] mb-1`}
          >
            {notification.title}
          </div>
          <div
            style={{ textAlign: "start" }}
            className={`${compact ? "text-xs" : "text-sm"} text-[#808181]`}
          >
            {notification.date_formatted} • {notification.summary}
          </div>
        </Flex>
      </Flex>
      {showButtons && (
        <NotificationActions
          notificationId={notification.id}
          notificationTitle={notification.title}
          isUnread={isUnread}
          onReview={onReview}
          onMarkAsRead={onMarkAsRead}
          className="flex-shrink-0"
        />
      )}
    </Flex>
  );
}
