import { Flex } from "antd";
import NotificationsView from "@/views/notifications";

export default function NotificationsPage() {
  const notifications = true;

  return (
    <Flex className="h-screen overflow-hidden">
      <Flex
        vertical
        gap={18}
        style={{
          width: "100%",
          padding: "26px 0px",
          height: "100%",
        }}
      >
        <NotificationsView notifications={notifications} />
      </Flex>
    </Flex>
  );
}
