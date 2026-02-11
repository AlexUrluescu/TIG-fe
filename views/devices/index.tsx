"use client";
import DevicesCard, { Device } from "@/app/components/DevicesCard";
import { Button, Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userRole } from "@/mocks/userRole";

const MOCK_DOWN_DEVICES: Device[] = [
  {
    id: "gw-7721",
    name: "Edge_Node_Alpha",
    type: "Gateway",
    status: "failed",
    clientName: "TechCorp Industries",
    ipAddress: "192.168.1.105",
    runtime: "12d 4h 22m",
    lastUpdate: "2026-02-01 14:30",
  },
  {
    id: "gw-0042",
    name: "Backup_Sensor_01",
    type: "Sensor",
    status: "failed",
    clientName: "BioHealth Solutions",
    ipAddress: "10.0.0.12",
    runtime: "0d 0h 0m",
    lastUpdate: "2026-01-30 09:15",
  },
  {
    id: "gw-9910",
    name: "Main_Router_Global",
    type: "Network",
    status: "failed",
    clientName: "Global Logistics",
    ipAddress: "172.16.254.1",
    runtime: "45d 12h 0m",
    lastUpdate: "2026-02-02 11:00",
  },
  {
    id: "ba5e3c86-90f6-4c16-b397-c3c6cb9bc514",
    name: "vhsk_248",
    type: "Gateway",
    status: "failed",
    clientName: "Security First Inc",
    ipAddress: "192.168.5.20",
    runtime: "3d 1h 10m",
    lastUpdate: "2026-02-02 08:45",
  },
];

const MOCK_DENIED_DEVICES: Device[] = [
  {
    id: "gw-7721",
    name: "Edge_Node_Alpha",
    type: "Gateway",
    status: "denied",
    clientName: "TechCorp Industries",
    ipAddress: "192.168.1.105",
    runtime: "12d 4h 22m",
    lastUpdate: "2026-02-01 14:30",
  },
  {
    id: "gw-0042",
    name: "Backup_Sensor_01",
    type: "Sensor",
    status: "denied",
    clientName: "BioHealth Solutions",
    ipAddress: "10.0.0.12",
    runtime: "0d 0h 0m",
    lastUpdate: "2026-01-30 09:15",
  },
  {
    id: "gw-9910",
    name: "Main_Router_Global",
    type: "Network",
    status: "denied",
    clientName: "Global Logistics",
    ipAddress: "172.16.254.1",
    runtime: "45d 12h 0m",
    lastUpdate: "2026-02-02 11:00",
  },
  {
    id: "ba5e3c86-90f6-4c16-b397-c3c6cb9bc514",
    name: "vhsk_248",
    type: "Gateway",
    status: "denied",
    clientName: "Security First Inc",
    ipAddress: "192.168.5.20",
    runtime: "3d 1h 10m",
    lastUpdate: "2026-02-02 08:45",
  },
];

const MOCK_ONLINE_DEVICES: Device[] = [
  {
    id: "gw-7721",
    name: "Edge_Node_Alpha",
    type: "Gateway",
    status: "online",
    clientName: "TechCorp Industries",
    ipAddress: "192.168.1.105",
    runtime: "12d 4h 22m",
    lastUpdate: "2026-02-01 14:30",
  },
  {
    id: "gw-0042",
    name: "Backup_Sensor_01",
    type: "Sensor",
    status: "online",
    clientName: "BioHealth Solutions",
    ipAddress: "10.0.0.12",
    runtime: "0d 0h 0m",
    lastUpdate: "2026-01-30 09:15",
  },
  {
    id: "gw-9910",
    name: "Main_Router_Global",
    type: "Network",
    status: "online",
    clientName: "Global Logistics",
    ipAddress: "172.16.254.1",
    runtime: "45d 12h 0m",
    lastUpdate: "2026-02-02 11:00",
  },
  {
    id: "ba5e3c86-90f6-4c16-b397-c3c6cb9bc514",
    name: "vhsk_248",
    type: "Gateway",
    status: "online",
    clientName: "Security First Inc",
    ipAddress: "192.168.5.20",
    runtime: "3d 1h 10m",
    lastUpdate: "2026-02-02 08:45",
  },
];

interface DevicesViewProps {
  devices: boolean;
  setSelectedDevice: (device: Device) => void;
}

const DevicesView: React.FC<DevicesViewProps> = ({
  devices,
  setSelectedDevice,
}) => {
  const router = useRouter();
  return devices ? (
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
      {userRole === "ADMIN" && (
        <Flex className="my-4">
          <Button onClick={() => router.push("/add-device")}>
            <Image
              src={"/plus-circle.svg"}
              height={15}
              width={15}
              alt="add device icon"
            />
            Add new device
          </Button>
        </Flex>
      )}

      <DevicesCard
        devices={MOCK_DOWN_DEVICES}
        title="Down Devices"
        setSelectedDevice={setSelectedDevice}
      />
      <DevicesCard
        devices={MOCK_DENIED_DEVICES}
        title="Denied Devices"
        setSelectedDevice={setSelectedDevice}
      />
      <DevicesCard
        devices={MOCK_ONLINE_DEVICES}
        title="Online Devices"
        setSelectedDevice={setSelectedDevice}
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
          You don’t have any device added yet.
        </span>

        {userRole === "ADMIN" && (
          <Button
            style={{
              border: "none",
              boxShadow: "none",
              fontSize: 20,
              fontWeight: 700,
              color: "#333F49",
            }}
            onClick={() => router.push("/add-device")}
          >
            <Image
              src={"/plus-circle.svg"}
              height={15}
              width={15}
              alt="add device icon"
            />
            Add new device
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default DevicesView;
