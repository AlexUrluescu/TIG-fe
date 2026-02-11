export type LogEntry = {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  actorId: string;
  actorRole: string;
  status: "Success" | "Failure" | "Pending";
  requestData: {
    vpnIds: string[];
    worldline: {
      leId: string;
      name: string;
      ipAddress: string;
      networkMask: string;
      setupPrefix: string;
      vxlanId: number;
      vhskunits: number;
    };
    metadata: Record<string, unknown>;
  };
  errorMessage: string | null;
  createdAt: string;
  count: number;
};
