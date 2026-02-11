export interface NotificationItem {
  id: string;
  title: string;
  version: string;
  date: string;
  dateRange: string;
  isRead: boolean;
  application: string;
  app_id?: string;
  application_id?: string;
  summary: string;
  date_formatted: string;
  detailsOfChange: string[];
  timestamp: string;
  type: "update" | "security" | "migration" | "enhancement" | "configuration";
}

export interface NotificationsData {
  notifications: NotificationItem[];
  total?: number;
}
