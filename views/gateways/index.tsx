"use client";
import { Button, Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GatwewaysCard from "@/app/components/GatewayCard";
import { Gateway } from "@/types/gateway";
import { MOCK_GATEWAYS } from "@/mocks/gateways";
import { userRole } from "@/mocks/userRole";

interface DevicesViewProps {
  gateways: boolean;
  showDrawer: (type: string, data: Gateway) => void;
}

const GatewaysView: React.FC<DevicesViewProps> = ({ gateways, showDrawer }) => {
  const router = useRouter();
  return gateways ? (
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
            Create TI-Gateway
          </Button>
        </Flex>
      )}

      <GatwewaysCard
        gateways={MOCK_GATEWAYS}
        title="Gateways"
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
          You don’t have any gateway added yet.
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
            onClick={() => router.push("/")}
          >
            <Image
              src={"/plus-circle.svg"}
              height={15}
              width={15}
              alt="add device icon"
            />
            Create a TI-Gateway
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default GatewaysView;
