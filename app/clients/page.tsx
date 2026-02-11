"use client";
import { useState } from "react";
import NavBarDevices from "../components/NavBarDevices";
import { Button, Flex } from "antd";
import Image from "next/image";
import { Client } from "@/types/client";
import ClientsView from "@/views/clients";
import BreadCrumb, { BreadcrumbItemType } from "./_components/BreadCrumb";
import {
  Organisation,
  OrganisationStatus,
  OrganisationType,
} from "@/types/organisation";
import TabsOrganisationComponent from "../organisations/_components/Tabs";
import ClientDetails from "../components/ClientDetails";
import { userRole } from "@/mocks/userRole";

export default function ClientsPage() {
  const [viewStack, setViewStack] = useState<BreadcrumbItemType[]>([]);

  const currentView =
    viewStack.length > 0 ? viewStack[viewStack.length - 1] : null;

  const getStatusClass = (status: string) => {
    switch (status) {
      case "online":
        return "bg-[#52c41a]";
      case "denied":
        return "bg-[#bfbfbf]";
      case "failed":
        return "bg-[#ff4d4f]";
      default:
        return "bg-black";
    }
  };

  const showDrawer = (_type: string, data: Client) => {
    setViewStack([{ title: "Client", type: "client", data: data }]);
  };

  const handleOrganisationClick = (_orgId: string) => {
    const mockOrgData: Organisation = {
      id: "org_3d2c1b0a-1234-5678-90ab-abcdef123459",
      name: "Main Reseller Group",
      code: "RES-001",
      organisationType: OrganisationType.RESELLER,
      status: OrganisationStatus.ACTIVE,
      contactEmail: "admin@reseller.com",
      createdAt: "2025-01-01T10:00:00Z",
      updatedAt: "2025-01-01T10:00:00Z",
    };

    setViewStack((prev) => [
      ...prev,
      { title: "Organisation", type: "organisation", data: mockOrgData },
    ]);
  };

  const handleBreadcrumbNavigate = (index: number) => {
    setViewStack((prev) => prev.slice(0, index + 1));
  };

  const actionButtonClass =
    "text-xs text-[#007A78] border-none shadow-none flex items-center gap-2 px-2";

  const clients = true;

  const renderClientDetails = (client: Client) => (
    <ClientDetails
      client={client}
      handleOrganisationClick={handleOrganisationClick}
      threadble={true}
    />
  );

  const renderOrganizationDetails = (org: Organisation) => (
    <div
      style={{
        background: "transparent",
      }}
      className="flex flex-col rounded-[9px]"
    >
      <TabsOrganisationComponent selectedOrganisation={org} />
    </div>
  );

  return (
    <Flex className="h-screen overflow-hidden">
      <Flex
        vertical
        gap={18}
        style={{
          width: clients ? "70%" : "100%",
          padding: "26px 0px",
          height: "100%",
        }}
      >
        <NavBarDevices tabSelected={"Clients"} />
        <ClientsView clients={clients} showDrawer={showDrawer} />
      </Flex>

      {clients ? (
        <Flex
          style={{
            width: "30%",
            background: "#F7F7F8",
            padding: 25,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {currentView ? (
            <Flex style={{ width: "100%" }} vertical gap={20}>
              <BreadCrumb
                items={viewStack}
                onNavigate={handleBreadcrumbNavigate}
              />
              <Flex justify="start" gap={20}>
                <Flex style={{ width: "15%" }}>
                  <Image
                    src={"/user-profile.svg"}
                    width={50}
                    height={50}
                    alt="user-profile"
                  />
                </Flex>
                <Flex
                  style={{ width: "85%" }}
                  justify="center"
                  align="start"
                  className="w-1/2"
                  vertical
                >
                  <span className="text-[17px] font-bold text-[#333F49]">
                    {currentView.data.name}
                  </span>
                  <span className="text-sm font-medium text-[#808181]">
                    {currentView.type === "client"
                      ? currentView.data.customerInfo
                      : "Organization Details"}
                  </span>

                  {currentView.type === "client" && (
                    <Flex align="center" gap={5}>
                      <span
                        className={`shrink-0 w-2.5 h-2.5 rounded-full ${getStatusClass(currentView.data.status)}`}
                      />
                      <span className="text-sm font-medium text-[#808181]">
                        {currentView.data.status}
                      </span>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              {userRole === "ADMIN" && (
                <Flex gap={10}>
                  <Button
                    style={{
                      fontSize: 12,
                      border: "none",
                      color: "#007A78",
                      justifyContent: "start",
                      fontWeight: 500,
                    }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/edit.svg"}
                      width={15}
                      height={15}
                      alt="edit-icon"
                    />
                    Edit User
                  </Button>
                  <Button
                    style={{
                      fontSize: 12,
                      border: "none",
                      color: "#007A78",
                      justifyContent: "start",
                      fontWeight: 500,
                    }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/plus-circle.svg"}
                      width={15}
                      height={15}
                      alt="plus-circle-icon"
                    />
                    Create VHSK
                  </Button>
                  <Button
                    style={{
                      fontSize: 12,
                      border: "none",
                      color: "#007A78",
                      justifyContent: "start",
                      fontWeight: 500,
                    }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/trash.svg"}
                      width={15}
                      height={15}
                      alt="trash-icon"
                    />
                    Delete User
                  </Button>
                </Flex>
              )}

              <div
                style={{
                  overflowY: "scroll",
                  background:
                    currentView.type === "client" ? "white" : "transparent",
                }}
                className="flex flex-col rounded-[9px] py-5 px-2.5"
              >
                {currentView.type === "client"
                  ? renderClientDetails(currentView.data)
                  : renderOrganizationDetails(currentView.data)}
              </div>
            </Flex>
          ) : (
            <Flex
              style={{ width: "100%" }}
              vertical
              justify="center"
              align="center"
              gap={20}
            >
              <Image
                src={"/no-device-selected.svg"}
                width={150}
                height={150}
                alt="no-device-select-picture"
              />
              <span
                style={{ color: "black", fontSize: "18", fontWeight: "600" }}
              >
                Select a client to view details.
              </span>
            </Flex>
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}
