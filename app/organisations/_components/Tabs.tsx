import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Organisation, OrganisationType } from "@/types/organisation";

interface TabsOrganisationComponentProps {
  selectedOrganisation: Organisation;
}

const detailRowClass = "w-full border-b border-[#F2F2F3] p-2 flex";
const detailLabelClass = "text-[11px] font-bold w-[30%] text-start";
const detailValueClass = "text-[11px] font-medium w-[70%] text-start";

const TabsOrganisationComponent: React.FC<TabsOrganisationComponentProps> = ({
  selectedOrganisation,
}) => {
  const formatEnum = (value: string) => {
    if (!value) return "-";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Organization ID</span>
            <span className={detailValueClass}>{selectedOrganisation.id}</span>
          </div>

          {/* Assuming 'Type' maps to organisationType */}
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Type</span>
            <span className={detailValueClass}>
              {formatEnum(selectedOrganisation.organisationType)}
            </span>
          </div>

          {/* Conditionally render Worldline DVO ID only if type is RESELLER */}
          {selectedOrganisation.organisationType ===
            OrganisationType.RESELLER && (
            <div className={detailRowClass}>
              <span className={detailLabelClass}>Worldline DVO ID</span>
              <span className={detailValueClass}>
                {selectedOrganisation.worldlineDvoId || "-"}
              </span>
            </div>
          )}

          {/* 'Wordline ID' likely maps to the 'code' field in your DTO */}
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Wordline ID</span>
            <span className={detailValueClass}>
              {selectedOrganisation.code}
            </span>
          </div>

          <div className={detailRowClass}>
            <span className={detailLabelClass}>Status</span>
            <span className={detailValueClass}>
              {formatEnum(selectedOrganisation.status)}
            </span>
          </div>

          <div className={detailRowClass}>
            <span className={detailLabelClass}>Phone number</span>
            <span className={detailValueClass}>
              {selectedOrganisation.contactPhone || "-"}
            </span>
          </div>

          <div className={detailRowClass}>
            <span className={detailLabelClass}>Email</span>
            <span className={detailValueClass}>
              {selectedOrganisation.contactEmail || "-"}
            </span>
          </div>

          <div className={detailRowClass}>
            <span className={detailLabelClass}>Address</span>
            <span className={detailValueClass}>
              {selectedOrganisation.address || "-"}
            </span>
          </div>

          <div className={detailRowClass}>
            <span className={detailLabelClass}>Created at</span>
            <span className={detailValueClass}>
              {selectedOrganisation.createdAt}
            </span>
          </div>

          <div className="w-full p-2.5 flex">
            <span className={detailLabelClass}>Updated at</span>
            <span className={detailValueClass}>
              {selectedOrganisation.updatedAt}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Clients",
      children: (
        <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Email</span>
            <span className={detailValueClass}>email@address.com</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Customer ID</span>
            <span className={detailValueClass}>cust1101</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Status</span>
            <span className={detailValueClass}>Draft</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardBg: "#1677ff",
              titleFontSize: 13,
              horizontalItemGutter: 16,
              inkBarColor: "#007A78",
              itemSelectedColor: "#007A78",
              itemHoverColor: "#007A78",
            },
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </ConfigProvider>
    </div>
  );
};

export default TabsOrganisationComponent;
