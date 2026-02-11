"use client";
import DevicesCard from "@/app/components/DevicesCard";
import { Button, Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userRole } from "@/mocks/userRole";
import { MOCK_DEVICES } from "@/mocks/devices";
import { Device } from "@/types/device";

interface DevicesViewProps {
  devices: boolean;
  setSelectedDevice: (device: Device) => void;
}

const DevicesView: React.FC<DevicesViewProps> = ({
  devices,
  setSelectedDevice,
}) => {
  const router = useRouter();

  const down_devices = MOCK_DEVICES.filter(
    (device) => device.status === "failed",
  );
  const denied_devices = MOCK_DEVICES.filter(
    (device) => device.status === "denied",
  );
  const online_devices = MOCK_DEVICES.filter(
    (device) => device.status === "online",
  );
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
        devices={down_devices}
        title="Down Devices"
        setSelectedDevice={setSelectedDevice}
      />
      <DevicesCard
        devices={denied_devices}
        title="Denied Devices"
        setSelectedDevice={setSelectedDevice}
      />
      <DevicesCard
        devices={online_devices}
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
