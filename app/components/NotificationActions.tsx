"use client";

import React from "react";
import { Flex, Button } from "antd";
import { COLORS as GLOBAL_COLORS } from "../colors";

interface NotificationActionsProps {
  notificationId: string;
  notificationTitle: string;
  isUnread: boolean;
  onReview: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  align?: "center" | "flex-start";
  className?: string;
}

export const COLORS = {
  primary: GLOBAL_COLORS.PRIMARY,
  blue: GLOBAL_COLORS.BLUE,
  gray: "#333F49",
  green: GLOBAL_COLORS.GREEN,
  textPrimary: GLOBAL_COLORS.TEXT_PRIMARY,
  border: GLOBAL_COLORS.BORDER_GRAY,
  disabled: GLOBAL_COLORS.TEXT_DISABLED,
  background: GLOBAL_COLORS.BACKGROUND_LIGHT,
  white: GLOBAL_COLORS.BACKGROUND_WHITE,
  textSecondary: "rgba(0,0,0,0.87)",
} as const;

export const STYLES = {
  buttonBase: {
    display: "inline-flex" as const,
    padding: "4px 12px",
    alignItems: "center" as const,
    borderRadius: "12px",
    border: "none",
  },
  textDetail: {
    color: COLORS.textSecondary,
    fontSize: "14px",
    lineHeight: "143%",
    letterSpacing: "0.17px",
  },
  pageSizeOptions: [
    { label: "5 / page", value: "5" },
    { label: "10 / page", value: "10" },
    { label: "20 / page", value: "20" },
    { label: "50 / page", value: "50" },
  ],
} as const;

export const NotificationActions: React.FC<NotificationActionsProps> = ({
  notificationId,
  notificationTitle,
  isUnread,
  onReview,
  onMarkAsRead,
  align = "center",
  className = "",
}) => {
  return (
    <Flex gap={8} align={align} className={className}>
      <Button
        style={{
          ...STYLES.buttonBase,
          background: COLORS.blue,
          color: COLORS.white,
        }}
        onClick={() => onReview(notificationId)}
        aria-label={`Review notification: ${notificationTitle}`}
      >
        View
      </Button>
      {isUnread && (
        <Button
          style={{
            ...STYLES.buttonBase,
            background: COLORS.gray,
            color: COLORS.white,
          }}
          onClick={() => onMarkAsRead(notificationId)}
          aria-label={`Mark notification as read: ${notificationTitle}`}
        >
          Mark as read
        </Button>
      )}
    </Flex>
  );
};
