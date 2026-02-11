"use client";
import { Button, Flex } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Organisation } from "@/types/organisation";
import OrganisationsCard from "@/app/components/OrganisationCard";
import { MOCK_ORGANISATIONS } from "@/mocks/organisations";
import { userRole } from "@/mocks/userRole";

interface OrganisationsViewProps {
  organisations: boolean;
  showDrawer: (type: string, data: Organisation) => void;
}

const OrganisationsView: React.FC<OrganisationsViewProps> = ({
  organisations,
  showDrawer,
}) => {
  const router = useRouter();
  return organisations ? (
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
      {userRole === "ADMIN" ? (
        <Flex className="my-4">
          <Button onClick={() => router.push("/add-device")}>
            <Image
              src={"/plus-circle.svg"}
              height={15}
              width={15}
              alt="add device icon"
            />
            Create Organisation
          </Button>
        </Flex>
      ) : null}

      <OrganisationsCard
        organisations={MOCK_ORGANISATIONS}
        title="Organisations"
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
          You don’t have any organisations added yet.
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
            Create Organisation
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default OrganisationsView;
