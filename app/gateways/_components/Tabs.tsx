import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Gateway } from "@/types/gateway";

interface TabsComponentProps {
  selectedGateway: Gateway;
}

const detailRowClass = "w-full border-b border-[#F2F2F3] p-2.5 flex";
const detailLabelClass = "text-[11px] font-bold w-[30%] text-start";
const detailLabelClassLarger = "text-[11px] font-bold w-[50%] text-start";
const detailValueClass = "text-[11px] font-medium w-[70%] text-start";
const detailValueClassSmaller = "text-[11px] font-medium w-[50%] text-start";
const actionButtonClass =
  "text-xs text-[#007A78] border-none shadow-none flex items-center gap-2 px-2";

const TabsComponent: React.FC<TabsComponentProps> = ({ selectedGateway }) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Configuration",
      children: (
        <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Gateway ID</span>
            <span className={detailValueClass}>{selectedGateway.id}</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Organisation ID</span>
            <span className={detailValueClass}>
              {selectedGateway.organisationID}
            </span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Client ID</span>
            <span className={detailValueClass}>{selectedGateway.clientId}</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Worldline LE ID</span>
            <span className={detailValueClass}>
              {selectedGateway.worldlineId}
            </span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>vHSK Name</span>
            <span className={detailValueClass}>{selectedGateway.vhskName}</span>
          </div>

          <div className={detailRowClass}>
            <span className={detailLabelClass}>vHSKUnits</span>
            <span className={detailValueClass}>
              {selectedGateway.vhskUnits}
            </span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>IP Address</span>
            <span className={detailValueClass}>
              {selectedGateway.ipAddress}
            </span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>VXLAN ID</span>
            <span className={detailValueClass}>{selectedGateway.vxlanId}</span>
          </div>

          <div className="w-full p-2.5 flex">
            <span className={detailLabelClass}>Network Mask</span>
            <span className={detailValueClass}>
              {selectedGateway.networkMark}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Infra Status from Kube",
      children: (
        <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Phase</span>
            <span className={detailValueClass}>Running</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Ready</span>
            <span className={detailValueClass}>Yes</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>Restarts</span>
            <span className={detailValueClass}>number</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClass}>IP Address</span>
            <span className={detailValueClass}>number</span>
          </div>
          <div className="w-full p-2.5 flex">
            <span className={detailLabelClass}>Node</span>
            <span className={detailValueClass}>number</span>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "WL Status",
      children: (
        <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
          <div className={detailRowClass}>
            <span className={detailLabelClassLarger}>Online Status</span>
            <span className={detailValueClassSmaller}>Online</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClassLarger}>Valid SMC-B Count</span>
            <span className={detailValueClassSmaller}>8</span>
          </div>
          <div className={detailRowClass}>
            <span className={detailLabelClassLarger}>
              Active Card Terminals
            </span>
            <span className={detailValueClassSmaller}>12</span>
          </div>
          <div className="w-full p-2.5 flex">
            <span className={detailLabelClassLarger}>
              Connected Card Terminals
            </span>
            <span className={detailValueClassSmaller}>12</span>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "VPNs",
      children: (
        <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
          <div className={detailRowClass}>
            <span className={detailLabelClass}>vpn_123</span>
            <span className={detailValueClass}>CLIENT_TO_CLIENT_VHSK</span>
          </div>
          <div className="w-full p-2.5 flex">
            <span className={detailLabelClass}>vpn_456</span>
            <span className={detailValueClass}>Card_Terminal</span>
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

export default TabsComponent;
