"use client";

import React, { useState } from "react";
import { Flex } from "antd";
import { useRouter } from "next/navigation";
import { NotificationItemRow } from "./NotificationItemRow";

import { SortButton } from "./SortButton";
import { MOCK_NOTIFICATIONS } from "@/mocks/notifications";

export function NotificationsMetricCard() {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleMarkAsRead = async (id: string) => {
    try {
      console.log("notification read");
      // updateNotification(id, { isRead: true })
      // await markNotificationAsRead(id)
      // logger.info('Notification marked as read', { notificationId: id })
      // message.success(SUCCESS_MESSAGES.NOTIFICATIONS.MARKED_READ)
    } catch (err) {
      // updateNotification(id, { isRead: false })
      // logger.error('Failed to mark notification as read', err)
      // message.error(ERROR_MESSAGES.NOTIFICATIONS.MARK_READ_FAILED)
    }
  };

  const handleReview = async (id: string) => {
    try {
      console.log("notification reviewed");
      // updateNotification(id, { isRead: true })
      // await markNotificationAsRead(id)
      // logger.info('Notification marked as read', { notificationId: id })
      // message.success(SUCCESS_MESSAGES.NOTIFICATIONS.MARKED_READ)
    } catch (err) {
      // updateNotification(id, { isRead: false })
      // logger.error('Failed to mark notification as read', err)
      // message.error(ERROR_MESSAGES.NOTIFICATIONS.MARK_READ_FAILED)
    }
  };

  const notifications = MOCK_NOTIFICATIONS;

  const displayNotifications = React.useMemo(() => {
    const unread = notifications.filter((n) => !n.isRead).slice(0, 3);
    if (unread.length >= 3) {
      return unread;
    }
    return notifications.slice(0, 3);
  }, [notifications]);

  return (
    <div
      style={{ gap: 10, border: "1px solid #DDDDDD" }}
      className="bg-white rounded-xl w-full flex flex-col h-[338px] px-4 lg:px-6 py-6"
    >
      <Flex justify="space-between" align="center" gap={8} className="mb-4">
        <div className="text-[#333F49] text-xl font-semibold leading-normal tracking-[-0.2px]">
          Alerts & Notifications
        </div>

        <SortButton
          sortOrder={sortOrder}
          onToggle={() =>
            setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
          }
        />
      </Flex>

      <div
        style={{ padding: "0px 10px" }}
        className="flex-1 flex flex-col overflow-y-auto"
      >
        {displayNotifications.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-sm text-[#808181]">No notifications</div>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <div key={notification.id} className="py-4">
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
        <div
          style={{ display: "flex", justifyContent: "end" }}
          className="mt-4 pt-3 border-t border-[#e0e0e0]"
        >
          <button
            onClick={() => router.push("/notifications")}
            className="text-sm text-[#000000] hover:text-[#0539a8] flex items-center gap-1 cursor-pointer"
          >
            View all
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
