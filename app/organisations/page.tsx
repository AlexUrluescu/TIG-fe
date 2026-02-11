"use client";
import { useState } from "react";
import NavBarDevices from "../components/NavBarDevices";
import { Button, Flex } from "antd";
import Image from "next/image";
import { Organisation } from "@/types/organisation";
import TabsOrganisationComponent from "./_components/Tabs";
import OrganisationsView from "@/views/organisations";
import { userRole } from "@/mocks/userRole";

export default function OrganisationsPage() {
  const [selectedOrganisation, setSelectedOrganisation] =
    useState<Organisation | null>(null);

  const showDrawer = (_type: string, data: Organisation) => {
    setSelectedOrganisation(data);
  };

  const actionButtonClass =
    "text-xs text-[#007A78] border-none shadow-none flex items-center gap-2 px-2";

  const organisations = true;

  const data = [
    { status: "off", percent: 10 },
    { status: "online", percent: 50 },
    { status: "standby", percent: 30 },
    { status: "off", percent: 10 },
  ] as const;

  return (
    <Flex className="h-screen overflow-hidden">
      <Flex
        vertical
        gap={18}
        style={{
          width: organisations ? "70%" : "100%",
          padding: "26px 0px",
          height: "100%",
        }}
      >
        <NavBarDevices tabSelected={"Organisations"} />
        <OrganisationsView
          organisations={organisations}
          showDrawer={showDrawer}
        />
      </Flex>

      {organisations ? (
        <Flex
          style={{
            width: "30%",
            background: "#F7F7F8",
            padding: 25,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {selectedOrganisation ? (
            <Flex style={{ width: "100%" }} vertical gap={20}>
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
                    {selectedOrganisation.name}
                  </span>
                  <span className="text-sm font-medium text-[#808181]">
                    {selectedOrganisation.code}
                  </span>
                </Flex>
              </Flex>

              {userRole === "ADMIN" && (
                <Flex gap={10}>
                  <Button
                    style={{
                      fontSize: 12,
                      border: "none",
                      color: "#007A78",
                      width: "50%",
                      justifyContent: "start",
                      fontWeight: 500,
                    }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/edit.svg"}
                      width={15}
                      height={15}
                      alt="reload-arrow-icon"
                    />
                    Edit
                  </Button>
                  <Button
                    style={{
                      fontSize: 12,
                      border: "none",
                      color: "#007A78",
                      width: "50%",
                      justifyContent: "start",
                      fontWeight: 500,
                    }}
                    className={actionButtonClass}
                  >
                    <Image
                      src={"/trash.svg"}
                      width={15}
                      height={15}
                      alt="reload-arrow-icon"
                    />
                    Delete
                  </Button>
                </Flex>
              )}

              <div
                style={{
                  background: "transparent",
                }}
                className="flex flex-col rounded-[9px]"
              >
                <TabsOrganisationComponent
                  selectedOrganisation={selectedOrganisation}
                />
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
                Select a organisation to view details.
              </span>
            </Flex>
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}
