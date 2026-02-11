"use client";
import { Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogEntry } from "@/types/logs";
import LogsCard from "@/app/audit/_components/LogsCard";
import { MOCK_LOGS } from "@/mocks/logs";

interface LogssViewProps {
  logs: boolean;
  showDrawer: (type: string, data: LogEntry) => void;
}

const LogsView: React.FC<LogssViewProps> = ({ logs, showDrawer }) => {
  const router = useRouter();
  return logs ? (
    <Flex
      vertical
      gap={18}
      style={{
        overflowY: "auto",
        flex: 1,
        minHeight: 0,
        padding: "0px 24px",
      }}
    >
      <Flex>
        <span style={{ fontSize: 17, fontWeight: 700, padding: "0px 10px" }}>
          Log Details
        </span>
      </Flex>
      <LogsCard
        logs={MOCK_LOGS}
        title="Logs"
        height="90vh"
        showDrawer={showDrawer}
      />
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
          You don’t have any logs added yet.
        </span>
      </Flex>
    </Flex>
  );
};

export default LogsView;
