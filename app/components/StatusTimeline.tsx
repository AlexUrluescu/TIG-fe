import React from "react";
import { theme, Typography } from "antd";

const { Text } = Typography;

interface TimelineSegment {
  status: "off" | "online" | "standby";
  percent: number;
}

interface StatusTimelineProps {
  segments: readonly TimelineSegment[];
  startTime: string;
  endTime: string;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  segments,
  startTime,
  endTime,
}) => {
  const { token } = theme.useToken();

  const getColor = (status: TimelineSegment["status"]) => {
    switch (status) {
      case "online":
        return token.colorSuccess;
      case "standby":
        return token.colorWarning;
      case "off":
        return token.colorError;
      default:
        return token.colorFillSecondary;
    }
  };

  return (
    <div style={{ width: "100%", marginTop: 16 }}>
      <div
        style={{
          display: "flex",
          height: 12,
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: token.colorFillSecondary,
        }}
      >
        {segments.map((seg, index) => (
          <div
            key={index}
            style={{
              width: `${seg.percent}%`,
              backgroundColor: getColor(seg.status),
              height: "100%",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text type="secondary" style={{ fontSize: 12 }}>
          {startTime}
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {endTime}
        </Text>
      </div>
    </div>
  );
};

export default StatusTimeline;
