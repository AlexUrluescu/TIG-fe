import { NotificationCard } from "@/app/notifications/_components/NotificationCard";
import { Flex } from "antd";
import Image from "next/image";

interface DevicesViewProps {
  notifications: boolean;
}

const NotificationsView: React.FC<DevicesViewProps> = ({ notifications }) => {
  return notifications ? (
    <Flex
      vertical
      gap={18}
      style={{
        width: "100%",
        padding: "0px 24px",
      }}
    >
      <NotificationCard />
    </Flex>
  ) : (
    <Flex style={{ height: "100%" }} justify="center" align="center">
      <Flex align="center" vertical gap={20}>
        <Image
          src={"/no-device-selected.svg"}
          width={200}
          height={170}
          alt={"empty-box-picture"}
        />
        <span style={{ fontSize: 22, fontWeight: 600 }}>
          You don’t have any notifications yet.
        </span>
      </Flex>
    </Flex>
  );
};

export default NotificationsView;
