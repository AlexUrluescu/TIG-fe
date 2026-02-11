"use client";
import { useState } from "react";
import { Flex } from "antd";
import Image from "next/image";
import { LogEntry } from "@/types/logs";
import LogsView from "@/views/logs";

export default function LogsPage() {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const showDrawer = (_type: string, data: LogEntry) => {
    setSelectedLog(data);
  };

  const detailRowClass = "w-full border-b border-[#F2F2F3] p-2.5 flex";
  const detailLabelClass = "text-[11px] font-bold w-[30%] text-start";
  const detailValueClass = "text-[11px] font-medium w-[70%] text-start";

  const logs = true;

  return (
    <Flex className="h-screen overflow-hidden">
      <Flex
        vertical
        gap={18}
        style={{
          width: logs ? "70%" : "100%",
          padding: "26px 0px",
          height: "100%",
        }}
      >
        <LogsView logs={logs} showDrawer={showDrawer} />
      </Flex>

      {logs ? (
        <Flex
          style={{
            width: "30%",
            background: "#F7F7F8",
            padding: 25,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {selectedLog ? (
            <Flex className="w-100" vertical gap={20}>
              <Flex justify="space-between">
                <span
                  style={{ fontSize: 17, fontWeight: 700, padding: "0px 5px" }}
                >
                  Log Details
                </span>
              </Flex>

              <div className="flex flex-col bg-white rounded-[9px] py-5 px-2.5">
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>ID</span>
                  <span className={detailValueClass}>{selectedLog.id}</span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Action</span>
                  <span className={detailValueClass}>{selectedLog.action}</span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Resource Type</span>
                  <span className={detailValueClass}>
                    {selectedLog.resourceType}
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Resource ID</span>
                  <span className={detailValueClass}>
                    {selectedLog.resourceId}
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Actor ID</span>
                  <span className={detailValueClass}>
                    {selectedLog.actorId}
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Status</span>
                  <span className={detailValueClass}>{selectedLog.status}</span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Request Data</span>
                  <span className={detailValueClass}>
                    {selectedLog.requestData.toString()}
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Error Message</span>
                  <span className={detailValueClass}>
                    {selectedLog.errorMessage}
                  </span>
                </div>
                <div className={detailRowClass}>
                  <span className={detailLabelClass}>Created At</span>
                  <span className={detailValueClass}>
                    {selectedLog.createdAt}
                  </span>
                </div>

                <div className="w-full p-2.5 flex">
                  <span className={detailLabelClass}>Count</span>
                  <span className={detailValueClass}>{selectedLog.count}</span>
                </div>
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
                Select a gateway to view details.
              </span>
            </Flex>
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}
