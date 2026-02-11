"use client";
import { Button, Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Client } from "@/types/client";
import ClientsCard from "@/app/components/ClientCard";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { userRole } from "@/mocks/userRole";

interface ClientsViewProps {
  clients: boolean;
  showDrawer: (type: string, data: Client) => void;
}

const ClientsView: React.FC<ClientsViewProps> = ({ clients, showDrawer }) => {
  const router = useRouter();
  return clients ? (
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
            Create Client
          </Button>
        </Flex>
      )}

      <ClientsCard
        clients={MOCK_CLIENTS}
        title="Clients"
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
          You don’t have any clients enrolled yet.
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
            Create Client
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ClientsView;
