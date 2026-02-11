import { LogEntry } from "@/types/logs";

export const MOCK_LOGS: LogEntry[] = [
  {
    id: "bc25a671-8263-488e-bece-0bb9dcb667b7",
    action: "CLIENT_LIST_ATTEMPT",
    resourceType: "client",
    resourceId: "org_956d1e97-a9a6-412e-b352-c2247df60b75",
    actorId: "Medifox",
    actorRole: "Admin",
    status: "Success",
    requestData: {
      vpnIds: ["vpn_123", "vpn_456"],
      worldline: {
        leId: "26d0938d-2be3-4353-bd52-76d66e2f20f9",
        name: "medifox-vHSK01",
        ipAddress: "172.16.168.156",
        networkMask: "255.255.255.0",
        setupPrefix: "vhsk_248",
        vxlanId: 11033,
        vhskunits: 1,
      },
      metadata: { additionalProp1: {} },
    },
    errorMessage:
      "Client with id 'client_76644c2d-e348-4d75-94cb-831325ef6101' not found in organisation 'org_956d1e97-a9a6-412e-b352-c2247df60b75'",
    createdAt: "2026-01-29 10:50:17.541888 +00:00",
    count: 2,
  },

  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    action: "CLIENT_CREATE_ATTEMPT",
    resourceType: "client",
    resourceId: "org_956d1e97-a9a6-412e-b352-c2247df60b75",
    actorId: "Medifox",
    actorRole: "Admin",
    status: "Success",
    requestData: {
      vpnIds: ["vpn_789"],
      worldline: {
        leId: "55d0938d-1ae3-4353-bd52-11d66e2f20f1",
        name: "logistics-vHSK02",
        ipAddress: "172.16.168.157",
        networkMask: "255.255.255.0",
        setupPrefix: "vhsk_249",
        vxlanId: 11034,
        vhskunits: 2,
      },
      metadata: { region: "eu-central" },
    },
    errorMessage:
      "Client with id 'client_76644c2d-e348-4d75-94cb-831325ef6101' not found in organisation 'org_956d1e97-a9a6-412e-b352-c2247df60b75'",
    createdAt: "2026-01-30 09:15:22.102330 +00:00",
    count: 1,
  },

  {
    id: "99887766-5544-3322-1100-aabbccddeeff",
    action: "CLIENT_UPDATE_ATTEMPT",
    resourceType: "client",
    resourceId: "org_956d1e97-a9a6-412e-b352-c2247df60b75",
    actorId: "Medifox",
    actorRole: "User",
    status: "Failure",
    requestData: {
      vpnIds: ["vpn_123"],
      worldline: {
        leId: "26d0938d-2be3-4353-bd52-76d66e2f20f9",
        name: "medifox-vHSK01-UPDATED",
        ipAddress: "192.168.1.1",
        networkMask: "255.255.255.0",
        setupPrefix: "vhsk_248",
        vxlanId: 11033,
        vhskunits: 1,
      },
      metadata: { ticketId: "TICKET-404" },
    },
    errorMessage:
      "IP Address '192.168.1.1' overlaps with reserved reserved range in 'vxlan_11033'",
    createdAt: "2026-01-30 11:45:00.000000 +00:00",
    count: 5,
  },

  {
    id: "ffeeffee-ddcc-bbaa-9988-776655443322",
    action: "SYSTEM_SYNC_ATTEMPT",
    resourceType: "client",
    resourceId: "org_956d1e97-a9a6-412e-b352-c2247df60b75",
    actorId: "Medifox",
    actorRole: "System",
    status: "Success",
    requestData: {
      vpnIds: ["vpn_123", "vpn_456", "vpn_789"],
      worldline: {
        leId: "system-sync",
        name: "BATCH_SYNC",
        ipAddress: "0.0.0.0",
        networkMask: "0.0.0.0",
        setupPrefix: "N/A",
        vxlanId: 0,
        vhskunits: 0,
      },
      metadata: { type: "daily_reconciliation" },
    },
    errorMessage:
      "Client with id 'client_76644c2d-e348-4d75-94cb-831325ef6101' not found in organisation 'org_956d1e97-a9a6-412e-b352-c2247df60b75'",
    createdAt: "2026-01-30 12:00:00.555123 +00:00",
    count: 1,
  },
];
